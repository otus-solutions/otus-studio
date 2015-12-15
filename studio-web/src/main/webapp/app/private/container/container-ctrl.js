var aux = document.querySelectorAll(".lado");
var tam = aux.length;

window.onresize = sizeScreen;

function sizeScreen() {
	if (aux) {
		for (var i = 0; i < tam; ++i) {
			aux[i].style.height = window.innerHeight - 20 + "px";
		}
	}
}

sizeScreen();