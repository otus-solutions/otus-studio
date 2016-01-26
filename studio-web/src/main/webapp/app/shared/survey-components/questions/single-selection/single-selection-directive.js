(function() {
    angular
        .module('survey.questions', [])
        .directive('singleSelectionQuestion', ['$compile', function ($compile) {
            var directive = {
                restrict : 'E',
                templateUrl : 'shared/survey-components/questions/single-selection/single-selection-question-template.html',
                link: function(scope, element, attrs) {
                    var button = element.find('button');
                    button.on('click', function() {
                        var group = angular.element(element.find('md-radio-group'));

                        var template = '<md-radio-button value="laranja">Laranja</md-radio-button>';
                        var compiled = $compile(template)(scope);
                        console.log(compiled);
                        group.append(compiled);
                    });
                }
            };
            return directive;
        }]);
}());
