(function() {

    angular
        .module('editor.engine.core')
        .service('StudioEditorService', ['SurveyLoaderService', 'EditorEngineService', StudioEditorService]);

    function StudioEditorService(SurveyLoaderService, EditorEngineService) {
        var self = this;

        /* Public interface */
        self.createNewSurvey = createNewSurvey;
        self.closeSurvey = closeSurvey;
        self.loadSurvey = loadSurvey;
        self.getCurrentSurvey = getCurrentSurvey;
        self.getCurrentQuestion = getCurrentQuestion;

        /* Public interface implementation */
        function createNewSurvey() {
            var survey = SurveyLoaderService.newSurvey();
            initializeEditing(survey);
        }

        function closeSurvey() {
            EditorEngineService.close();
        }

        function saveSurvey() {
            EditorEngineService.save();
        }

        function loadSurvey() {
            // A persisted survey object should be load here.
            // var survey = SurveyLoader.loadSurvey();
            // initializeEditing(survey);
        }

        function initializeEditing(survey) {
            EditorEngineService.init(survey);
            EditorEngineService.open();
        }

        function getCurrentSurvey() {
            return EditorEngineService.getSurvey();
        }

        function getCurrentQuestion() {

        }

    }

}());
