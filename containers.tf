variable "studio" {
  type = "map"
  default = {
	"name" = "otus-studio"
	"port" = 51004
  }
}

resource "docker_image" "otus-studio" {
  name = "otus-studio:latest"
}

resource "docker_container" "otus-studio" {
  name = "otus-studio"
  image = "${docker_image.otus-studio.latest}"
  ports {
	internal = 80
	external = "${var.studio["port"]}"
  }
}
