(function() {

    var numericQuestion = function() {
        var directive = {
            templateUrl: "shared/survey-components/questions/text/text-question-template.html",
            restrict: "E"
        };
        return directive;
    };

    angular
        .module('survey.questions')
        .directive('textQuestion', numericQuestion);

}());
