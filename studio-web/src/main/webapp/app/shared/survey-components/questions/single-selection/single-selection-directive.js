(function() {
    angular
        .module('survey.questions')
        .directive('singleSelectionQuestion', function() {
            var directive = {
                templateUrl : "shared/survey-components/questions/single-selection/single-selection-question-template.html",
                restrict : "E",
                link: function(scope, element, attrs) {
                    var button = element.find("button");
                    button.on("click", function() {
                        var aux = element.find("md-radio-button");
                        aux.append("<h1>Olá mundo</h1>");
                    });
                },
                replace: false,
                transclude: true,
                scope: {

                }
            };
            return directive;
        });
}());


/**

function returnNewElement() {
    var radio = document.createElement("md-radio-button");
    radio.setAttribute("value", "outro");
    radio.setAttribute("editable", "");
    radio.textContent = "outro";
    return radio;
}

function add() {
    var newNode = returnNewElement();
    document.getElementById("myList").appendChild(newNode);
}


**/
