variable "otus-studio-port"{
  default = 51004
}

variable "otus-studio-version" {
   default = "otus-studio:latest"
}

resource "docker_container" "otus-studio" {
  name = "otus-studio"
  image = "${var.otus-studio-version}"
  ports {
	internal = 80
	external = "${var.otus-studio-port}"
  }
}
