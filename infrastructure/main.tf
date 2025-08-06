# ------ #
# Locals #
# ------ #
locals {
  bucket_name     = "ma-mfe-assets-${var.env_id}"
  distribution_id = lookup(data.terraform_remote_state.mfe.outputs.cdn, "cloudfront_distribution_id")

  # blueprint local variables
  jira_regex       = "[A-Z]+-[0-9]+" # "(RT|AG|AI|SE)-[0-9]+"
  jira_tkts_msg    = toset(flatten(regexall(local.jira_regex, var.commit_message)))
  jira_tickets     = [for item in local.jira_tkts_msg : item if !startswith(item, "RT-")]
  jira_tickets_str = join(",", local.jira_tickets)
  environment      = lookup(var.blueprint_env, var.env_id)
  pr_id            = var.applying ? element(regex("\\(#(\\d+)\\)", var.commit_message), 0) : ""
  deployer         = split("@", var.author_email)[0]
  blueprint_data = {
    deploymentSource  = "GitHub",
    disciplineList    = "MFE",
    environment       = lookup(var.blueprint_env, var.env_id),
    fixVersion        = "${local.pr_id}-${var.micro_service}",
    jiraTicketList    = local.jira_tickets_str,
    sourceReferenceID = var.actions_run_number,
    hasMicroservice   = true,
    name              = var.application,
    notes             = var.commit_message,
    deployer          = split("@", var.author_email)[0],
    isRollback        = var.is_rollback,
    parent            = "",
    isEmergency       = false
  }
}

# ---- #
# Data #
# ---- #
data "aws_s3_bucket" "assets" {
  bucket = local.bucket_name
}

data "terraform_remote_state" "mfe" {
  backend = "s3"
  config = {
    bucket = "mae-misc-tf-backend"
    region = "us-east-1"
    key    = "mfe-market-america/mfe-infrastructure/${var.env_id}/terraform.tfstate"
  }
}

# Sends the deployment information to blueprint consolidated log.
data "http" "blueprint_log" {
  depends_on = [
    terraform_data.clear_cache
  ]
  count  = (var.env_id == "stg" || var.env_id == "prd") && var.applying ? 1 : 0
  url    = "https://api2.shop.com/blueprint-deployment-log/v1/log"
  method = "POST"

  request_headers = {
    "Content-Type"  = "application/json"
    "Authorization" = "Bearer ${var.blueprint_api_key}"
  }
  request_body = jsonencode({
    deploymentSource  = "GitHub",
    disciplineList    = "MFE",
    environment       = lookup(var.blueprint_env, var.env_id),
    fixVersion        = "${local.pr_id}-${var.micro_service}",
    jiraTicketList    = local.jira_tickets_str,
    sourceReferenceID = var.actions_run_number,
    hasMicroservice   = true,
    name              = var.application,
    notes             = var.commit_message,
    deployer          = split("@", var.author_email)[0],
    isRollback        = var.is_rollback,
    parent            = "",
    isEmergency       = false
  })
}

# Transition jira tickets
## For staging deployment, Resolved -> Staged
## For prod deployment, Verified on Staging -> Released to Live

data "http" "jira_status" {
  for_each = (var.env_id == "stg" || var.env_id == "prd") && var.applying ? local.jira_tickets : toset([])
  url      = "https://jira.marketamerica.com/rest/api/2/issue/${each.key}?fields=status"
  method   = "GET"

  request_headers = {
    "Accept"        = "application/json"
    "Authorization" = "Bearer ${var.jira_api_key}"
  }
  lifecycle {
    postcondition {
      condition     = contains([200], self.status_code) && contains(lookup(lookup(var.env_jira_status, split("-", each.key)[0]), var.env_id), jsondecode(self.response_body)["fields"]["status"]["name"])
      error_message = "[ERROR] Jira issue: ${each.key} must be in ${element(lookup(lookup(var.env_jira_status, split("-", each.key)[0]), var.env_id), 0)} state before deployment.But, currently it is: ${jsondecode(self.response_body)["fields"]["status"]["name"]}" # Eg: AI-10000 on stg will give: Resolved
    }
  }
}

data "http" "jira_transition" {
  depends_on = [terraform_data.clear_cache]
  for_each   = (var.env_id == "stg" || var.env_id == "prd") && var.applying ? local.jira_tickets : toset([])
  url        = "https://jira.marketamerica.com/rest/api/2/issue/${each.key}/transitions"
  method     = "POST"
  request_headers = {
    "Content-Type"  = "application/json"
    "Authorization" = "Bearer ${var.jira_api_key}"
  }

  request_body = jsonencode({
    transition = {
      id = lookup(lookup(var.jira_transitions, split("-", each.key)[0]), var.env_id) # Eg: AI-10000 on stg will give: 1161
    }
  })
}

# --------- #
# Resources #
# --------- #
# This creates a json file with what invalidation to create. Refer: https://docs.aws.amazon.com/cli/latest/reference/cloudfront/create-invalidation.html
# We had to take this approch because the bash terminal is failing with the following error: An error occurred (InvalidArgument) when calling the CreateInvalidation operation: Your request contains one or more invalid invalidation paths.
resource "local_file" "invalidation_json" {
  content = <<EOF
{
    "Paths": {
        "Quantity": 1,
        "Items": [
            "/${var.micro_service}*"
        ]
    },
    "CallerReference": "${var.micro_service}-${timestamp()}"
}
EOF

  filename = "${path.module}/${var.invalidation_json}"
}

resource "aws_s3_object" "dist" {
  # depends_on = [data.http.jira_status]
  for_each = fileset("../dist", "*")
  bucket   = local.bucket_name
  # force_destroy = true
  key    = "${var.micro_service}/${each.value}"
  source = "../dist/${each.value}"
  etag   = filemd5("../dist/${each.value}")
}

# Auto clears cache for the microservice only if there is a change in the built files in teh dist folder
resource "terraform_data" "clear_cache" {
  depends_on = [
    local_file.invalidation_json,
    aws_s3_object.dist
  ]
  triggers_replace = timestamp()
  provisioner "local-exec" {
    command = "aws cloudfront create-invalidation --distribution-id ${local.distribution_id} --invalidation-batch file://${var.invalidation_json}"
    # interpreter = ["Powershell", "-Command"] # For local windows development
    interpreter = ["bash", "-c"] # Assuming default runner is linux OS
  }
}
