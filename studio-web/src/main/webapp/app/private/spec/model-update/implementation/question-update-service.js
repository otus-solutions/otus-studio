(function() {

    angular
        .module('spec')
        .service('SurveyQuestionsUpdateService', SurveyQuestionsUpdateService);

    function SurveyQuestionsUpdateService() {
        var self = this;

        /* Public interface */
        self.update = update;
        self.addQuestion = addQuestion;
        self.removeQuestion = removeQuestion;

        /* Public interface implementation */
        function addQuestion(questionFactory, survey) {
            var nextOID = survey.questions.length,
                newQuestion = questionFactory.create(nextOID);

            survey.questions.push(newQuestion);

            return newQuestion;
        }

        function removeQuestion(questionIndex, survey) {
            survey.questions.splice(questionIndex, 1);
        }

        function update(editingEvent, survey) {
            // updateLabelValue(editingEvent, survey);
        }
    }

}());
