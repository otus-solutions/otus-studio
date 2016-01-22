function returnNewElement() {
    var radio = document.createElement("md-radio-button");
    radio.setAttribute("value", "outro");
    radio.setAttribute("edit-mode", "");
    radio.textContent = "outro";
    return radio;
}

function add() {
    var newNode = returnNewElement();
    document.getElementById("myList").appendChild(newNode);
}
