###############################################
###               Variables                 ###
###############################################
variable "otus-studio-dockerfile" {
  default = "."
}

variable "otus-studio-name" {
  default = "otus-studio"
}

variable "otus-studio-directory" {
  default = "otus-studio"
}
variable "otus-studio-source" {
  default = "source"
}

variable "otus-studio-npminstall" {
  default = "npm install"
}

variable "otus-studio-npmtest" {
  default = "npm test"
}

variable "otus-studio-npmbuild" {
  default = "npm run build"
}

variable "otus-studio-npmprune" {
  default = "npm prune --production"
}

variable "otus-studio-dockerbuild" {
  default = "build"
}

###############################################
###  OTUS-STUDIO : Build Image Front-End    ###
###############################################
resource "null_resource" "otus-studio-install" {
  provisioner "local-exec" {
    working_dir = "${var.otus-studio-source}"
    command = "${var.otus-studio-npminstall}"
  }
}

resource "null_resource" "otus-studio-test" {
  depends_on = [null_resource.otus-studio-install]
  provisioner "local-exec" {
    working_dir = "${var.otus-studio-source}"
    command = "${var.otus-studio-npmtest}"
  }
}

resource "null_resource" "otus-studio-build" {
  depends_on = [null_resource.otus-studio-test]
  provisioner "local-exec" {
    working_dir = "${var.otus-studio-source}"
    command = "${var.otus-studio-npmbuild}"
  }
}

resource "null_resource" "otus-studio-prune" {
  depends_on = [null_resource.otus-studio-build]
  provisioner "local-exec" {
    working_dir = "${var.otus-studio-source}"
    command = "${var.otus-studio-npmprune}"
  }
}

resource "null_resource" "otus-studio" {
  depends_on = [null_resource.otus-studio-build]
  provisioner "local-exec" {
    command = "docker ${var.otus-studio-dockerbuild} -t ${var.otus-studio-name} ${var.otus-studio-dockerfile}"
  }
}
