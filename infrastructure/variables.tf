variable "micro_service" {
  type        = string
  description = "The micro service name. \n Note: This changes for every microservice. It in Pascal Casing"
  default     = "OrderConfirmation"
}

variable "create" {
  default     = true
  type        = bool
  description = "Create or destroy infrastructure, passed during runtime from Jenkinsfile"
}

variable "aws_region" {
  type        = string
  default     = "us-east-1"
  description = "AWS region the infrastructure gets deployed to."
}

variable "env_id" {
  type        = string
  default     = "dev"
  description = "short abbrv for the environment: dev, stg, prd, ltv, dre"

  validation {
    condition     = length(var.env_id) == 3 && contains(["dev", "stg", "ltv", "prd", "dre"], var.env_id)
    error_message = "Enter only one of dev, stg, prd or dre. Other values are not accepted."
  }
}

variable "app_id" {
  type        = string
  default     = "MFE"
  description = "Micro Front End"
}

variable "application" {
  type        = string
  default     = "mfe-order-confirmation"
  description = "Micro Front End Components"
}

variable "invalidation_json" {
  default     = "inv-batch.json"
  type        = string
  description = "json file to pass to the create-invalidation command to clear cloudfront cache."
}

variable "blueprint_env" {
  type = map(any)
  default = {
    dev = "Development"
    stg = "Staging"
    prd = "Production"
  }
  description = "Environment value to be used on blueprint consolidated log."
}

variable "github_sha" {
  type        = string
  description = "(passed during runtime) github sha for the triggered commit."
}

variable "commit_message" {
  type        = string
  description = "(passed during runtime) The github commit message, usually pull request title"
  validation {
    condition     = length(flatten(regexall("[A-Z]+-[0-9]+", var.commit_message))) > 0
    error_message = "Please include at least ONE VALID JIRA TICKET in your commit/title."
  }
}

variable "author_email" {
  type        = string
  description = "(passed during runtime) the email address of the head commit's author"
  validation {
    condition     = contains(["marketamerica.com", "shop.com", "mawwservices.com"], split("@", var.author_email)[1])
    error_message = "You're using ${var.author_email}. Please use your @marketamerica.com or shop.com or mawwservices.com email for git activities."
  }
}

variable "actions_run_number" {
  type        = string
  description = "(passed during runtime) action run number as seen on the github UI."
}

variable "actions_run_id" {
  type        = string
  description = "(passed during runtime) action run unique identifier as seen on the github url."
}

variable "is_rollback" {
  type    = bool
  default = false
}

variable "blueprint_api_key" {
  type        = string
  description = "stored in github actions secrets, API key for blueprint log api"
  default     = ""
}

variable "jira_api_key" {
  type        = string
  description = "stored in github actions secrets, API key for JIRA: jira.marketamerica.com"
  default     = ""
}

variable "applying" {
  type        = bool
  description = "(passed during runtime) Whether this is an apply or a plan event - this is only used for the http data resource; required only for staging and production"
  default     = false
}

variable "jira_transitions" {
  description = "Jira transitions for dev-stg and stg-prd. Fetched from JIRA rest api"
  default = {
    "AI" = {
      "stg" = "1161", # From Resolved - Staged
      "prd" = "1171"  # From Verified on Staging - Released to Live
    }
  }
}

variable "env_jira_status" {
  description = "The desired state of Jira tickets before doing the deployment."
  default = {
    "AI" = {
      "stg" = ["Resolved", "Staged", "Verified on Staging"]         # Leave Resolved at index 0
      "prd" = ["Verified on Staging", "Released to Live", "Closed"] # Leave Verified on Staging at index 0
    }
  }
}