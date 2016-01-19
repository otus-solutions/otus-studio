(function() {

    // Deve estar no input
    var toogleLabel = function($compile) {
        return {
            link: function(scope, element, attrs, controller) {
                element.on('blur', function() {
                    var allElement = element.parent();
                    allElement.replaceWith($compile('<p toogle-input>' + element.val() + '</p>')(scope));
                });
            }
        };
    }

    // Deve estar na tag <p>
    var toogleInput = function($compile) {
        return {
            link: function(scope, element, attrs, controller) {

                element.on('click', function() {
                    var inputWithLabelTemplate = '<md-input-container class="md-block" md-theme="layoutTheme"> ' +
                        '<input type="text" value="' + element.text() + '" aria-label="Label da questão" toogle-label /></input> ' +
                        '</md-input-container>';
                    element.replaceWith($compile(inputWithLabelTemplate)(scope)[0]);
                });
            }
        };
    }

    angular.module('StudioApp')
        .directive('toogleLabel', toogleLabel);


    angular.module('StudioApp')
        .directive('toogleInput', toogleInput);

    toogleInput.$inject = ['$compile'];
    toogleLabel.$inject = ['$compile'];

}());
