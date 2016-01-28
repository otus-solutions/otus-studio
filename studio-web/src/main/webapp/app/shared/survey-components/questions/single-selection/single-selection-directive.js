(function() {
    function singleSelectionQuestion() {
        var singleSelectionQuestionDDO = {
            restrict: 'E',
            scope: {},
            templateUrl: 'shared/survey-components/questions/single-selection/single-selection-question-template.html',
            link: function(scope, element, attrs, controller) {
                scope.options = [1];

                scope.addItem = function() {
                    scope.options.push(scope.options.length + 1);
                };
                scope.removeItem = function() {
                    scope.options.pop(scope.options.length + 1);
                };
            }
        };
        return singleSelectionQuestionDDO;
    }

    angular.module('survey.questions').directive('singleSelectionQuestion', singleSelectionQuestion);

}());
