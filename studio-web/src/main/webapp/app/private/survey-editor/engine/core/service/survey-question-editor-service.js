(function() {

    angular
        .module('editor.engine.core')
        .service('SurveyQuestionEditorService', SurveyQuestionEditorService);

    SurveyQuestionEditorService.$inject = [
        'EditorEngineService',
        'CalendarQuestionFactory',
        'TextQuestionFactory'
    ];

    function SurveyQuestionEditorService(EditorEngineService, CalendarQuestionFactory, TextQuestionFactory) {
        var self = this;

        /* Public interface */
        self.createCalendarQuestion = createCalendarQuestion;
        self.createTextQuestion = createTextQuestion;

        function createCalendarQuestion() {
            return createQuestion(CalendarQuestionFactory);
        }

        function createTextQuestion() {
            return createQuestion(TextQuestionFactory);
        }

        function createQuestion(questionFactory) {
            var survey = EditorEngineService.getSurvey(),
                oid = survey.questions.length,
                question = questionFactory.create(oid);

            survey.questions.push(question);

            return question;
        }

    }

}());
