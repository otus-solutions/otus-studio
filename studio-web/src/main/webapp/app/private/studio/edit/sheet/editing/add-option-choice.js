
function retornaNovoElemento() {
    var node = document.createElement("md-radio-button");
    var textnode = document.createTextNode("inserir o texto da label");
    node.appendChild(textnode);
    return node;
}


function add() {
  console.log("olá mundo");
  var aux = retornaNovoElemento();
  document.getElementById("myList").appendChild(node);

}
