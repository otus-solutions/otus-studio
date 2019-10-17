###############################################
###               Variables                 ###
###############################################

variable "otus-studio" {
  type = "map"
  default = {
    "name" = "otus-studio"
    "directory" = "otus-studio"
    "source" = "/source"
  }
}

###############################################
###  OTUS-STUDIO : Build Image Front-End    ###
###############################################
resource "null_resource" "otus-studio" {
  provisioner "local-exec" {
    command = "cd ${var.otus-studio["directory"]}/${var.otus-studio["source"]} && npm install"
  }
  provisioner "local-exec" {
    command = "sudo docker build -t ${var.otus-studio["name"]} ${var.otus-studio["directory"]}"
  }
}