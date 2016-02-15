(function() {

    angular
        .module('editor.engine.core')
        .service('SurveyQuestionEditorService', SurveyQuestionEditorService);

    SurveyQuestionEditorService.$inject = [
        'EditorEngineService',
        'CalendarQuestionFactory',
        'NumericQuestionFactory',
        'SingleSelectionQuestionFactory',
        'TextQuestionFactory',
        'TimeQuestionFactory'
    ];

    function SurveyQuestionEditorService(EditorEngineService, CalendarQuestionFactory, NumericQuestionFactory, SingleSelectionQuestionFactory, TextQuestionFactory, TimeQuestionFactory) {
        var self = this;

        /* Public interface */
        self.createCalendarQuestion = createCalendarQuestion;
        self.createNumericQuestion = createNumericQuestion;
        self.createSingleSelectionQuestion = createSingleSelectionQuestion;
        self.createTextQuestion = createTextQuestion;
        self.createTimeQuestion = createTimeQuestion;

        function createCalendarQuestion() {
            return createQuestion(CalendarQuestionFactory);
        }

        function createNumericQuestion() {
            return createQuestion(NumericQuestionFactory);
        }

        function createSingleSelectionQuestion() {
            return createQuestion(SingleSelectionQuestionFactory);
        }

        function createTextQuestion() {
            return createQuestion(TextQuestionFactory);
        }

        function createTimeQuestion() {
            return createQuestion(TimeQuestionFactory);
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
