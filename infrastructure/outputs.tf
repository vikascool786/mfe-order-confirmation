# Common outputs
output "create" {
  value = var.create
}

output "env_id" {
  value = var.env_id
}

output "bucket_domain_name" {
  value = data.aws_s3_bucket.assets.bucket_domain_name
}

output "blueprint_data" {
  value = local.blueprint_data
}

output "actions_run_id" {
  value = var.actions_run_id
}