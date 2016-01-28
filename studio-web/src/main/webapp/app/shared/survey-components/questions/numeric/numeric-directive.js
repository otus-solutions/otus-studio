(function() {

    var numericQuestion = function() {
        var directive = {
            templateUrl: "shared/survey-components/questions/numeric/numeric-question-template.html",
            restrict: "E"
        };
        return directive;
    };

    angular
        .module('survey.questions')
        .directive('numericQuestion', numericQuestion);
}());
