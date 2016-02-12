(function() {

    angular
        .module('editor.engine.core')
        .service('SurveyQuestionEditorService', SurveyQuestionEditorService);

    SurveyQuestionEditorService.$inject = ['EditorEngineService', 'TextQuestionFactory'];

    function SurveyQuestionEditorService(EditorEngineService, TextQuestionFactory) {
        var self = this;

        /* Public interface */
        self.createTextQuestion = createTextQuestion;

        function createTextQuestion() {
            var survey = EditorEngineService.getSurvey(),
                oid = survey.questions.length,
                question = TextQuestionFactory.create(oid);

            survey.questions.push(question);
            
            return question;
        }

    }

}());
