(function() {
    function singleSelectionQuestion() {
        var singleSelectionQuestionDDO = {
            restrict: 'E',
            scope: {},
            templateUrl: 'shared/survey-components/questions/single-selection/single-selection-question-template.html',
            link: function(scope, element, attrs, controller) {
                scope.options = [1];
                var button = element.find('button');
                button.on('click', function() {
                    scope.options.push(scope.options.length + 1);
                });
            }
        };
        return singleSelectionQuestionDDO;
    }

    angular.module('survey.questions').directive('singleSelectionQuestion', singleSelectionQuestion);

}()); 
