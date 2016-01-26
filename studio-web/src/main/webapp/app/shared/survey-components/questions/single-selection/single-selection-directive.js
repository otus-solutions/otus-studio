(function() {

    var optionTemplatePath = 'shared/survey-components/questions/single-selection/single-selection-option-template.html';

    angular
        .module('survey.questions', [])
        .directive('singleSelectionQuestion', ['$compile', '$templateRequest', function($compile, $templateRequest) {
            var directive = {
                restrict: 'E',
                templateUrl: 'shared/survey-components/questions/single-selection/single-selection-question-template.html',
                controller: function($scope, $element) {
                    var self = this;

                    self.loadOption = function loadOption() {
                        $templateRequest(optionTemplatePath).then(function(html) {
                            var compileResult = $compile(html)($scope),
                                template = angular.element(compileResult);

                            var group = angular.element(element.find('md-radio-group'));
                            group.append(template);
                        });
                    };
                },
                link: function(scope, element, attrs, controller) {
                    var button = element.find('button');
                    button.on('click', function() {
                        // var group = angular.element(element.find('md-radio-group'));
                        // var template = '<md-radio-button value="laranja">Laranja</md-radio-button>';
                        // var radio = angular.element('<md-radio-button flex="5">');
                        // group.append(radio);
                        controller.loadOption();
                    });
                }
            };
            return directive;
        }]);

}());
