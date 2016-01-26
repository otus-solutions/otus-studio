(function() {

    var timeQuestion = function() {
        var timeQuestionDDO = {
            templateUrl: "shared/survey-components/questions/time-question/time-question-template.html",
            retrict: "E"
        };
        return timeQuestionDDO;
    }

    angular.module('survey.questions').directive("timeQuestion", timeQuestion);

}());
