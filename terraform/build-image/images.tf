###############################################
###               Variables                 ###
###############################################
variable "otus-studio-name" {
  default = "otus-studio"
}
variable "otus-studio-directory" {
  default = "otus-studio"
}
variable "otus-studio-source" {
  default = "source"
}

variable "otus-studio-npmbuild" {
  default = "run build"
}

variable "otus-studio-dockerbuild" {
  default = "build"
}

###############################################
###  OTUS-STUDIO : Build Image Front-End    ###
###############################################
resource "null_resource" "otus-studio-build" {
  provisioner "local-exec" {
    working_dir = "${var.otus-studio-source}"
    command = "npm ${var.otus-studio-npmbuild}"
  }
}

resource "null_resource" "otus-studio" {
  depends_on = [null_resource.otus-studio-build]
  provisioner "local-exec" {
    command = "docker ${var.otus-studio-dockerbuild} -t ${var.otus-studio-name} ."
  }
}
