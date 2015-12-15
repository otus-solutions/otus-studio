var aux = document.querySelectorAll(".box");
var tam = aux.length;

window.onresize = sizeScreen;

function sizeScreen() {
	console.log(" Tamanho lateral: " + window.innerWidth);
	console.log(" Tamanho altura: " + window.innerHeight);
	if (aux) {
		for (var i = 0; i < tam; ++i) {
			aux[i].style.height = window.innerHeight - 20 + "px";
		}
	}
}

sizeScreen();