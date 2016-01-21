(function() {

    // Deve estar na tag <p>
    angular.module('StudioApp').directive('toogleInput', ['$compile', function($compile) {
        return {
            link: function(scope, element, attrs, controller) {
                element.on('click', function() {
                    var inputWithLabelTemplate = '<md-input-container edit-mode class="md-block inputlabel" md-theme="layoutTheme" flex> ' +
                        '<input type="text" autofocus value="' + element.text() + '" aria-label="Label da questão" toogle-label /></input> ' +
                        '</md-input-container>';
                    element.replaceWith($compile(inputWithLabelTemplate)(scope));
                });
            }
        }
    }]);

    // Deve estar no input
    angular.module('StudioApp').directive('toogleLabel', ['$compile', function($compile) {
        var toogleLabelDirective = {
            link: function(scope, element, attrs, controller) {
                element.on('blur', function() {
                    var allElement = element.parent();
                    allElement.replaceWith($compile('<p flex toogle-input edit-mode>' + element.val() + '</p>')(scope));
                });
            }
        };

        return toogleLabelDirective;
    }]);

}());
