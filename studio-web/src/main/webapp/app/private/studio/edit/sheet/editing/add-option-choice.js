
function returnNewElement() {
    var node = document.createElement("md-radio-button");
    var textnode = document.createTextNode("inserir o texto da label");
    node.appendChild(textnode);
    return node;
}


function add() {
  var newNode = returnNewElement();
  document.getElementById("md-radio-group").appendChild(node);

}
