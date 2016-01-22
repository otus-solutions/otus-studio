(function() {

    var singleSelectionQuestion = function() {
            var directive = {
                templateUrl : "shared/survey-components/questions/single-selection/single-selection-question-template.html",
                restrict : "E"
            };
            return directive;
    };

    angular
        .module('survey.questions')
        .directive('singleSelectionQuestion', singleSelectionQuestion);
}());
