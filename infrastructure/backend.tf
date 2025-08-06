terraform {
  backend "s3" {
    bucket = "mae-misc-tf-backend"
    region = "us-east-1"
  }
}
