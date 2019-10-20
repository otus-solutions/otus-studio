variable "otus-studio-port"{
  default = 51004
}

variable "otus-studio-version"{
  default = "latest"
}

resource "docker_image" "otus-studio" {
  name = "otus-studio:${var.otus-studio-version}"
}

resource "docker_container" "otus-studio" {
  name = "otus-studio"
  image = "${docker_image.otus-studio.name}"
  ports {
	internal = 80
	external = "${var.otus-studio-port}"
  }
}
