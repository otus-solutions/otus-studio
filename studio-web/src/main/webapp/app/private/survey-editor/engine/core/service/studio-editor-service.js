(function() {

    angular
        .module('core')
        .service('StudioEditorService', ['SurveyLoader', 'EditingService', StudioEditorService]);

    function StudioEditorService(SurveyLoader, EditingService) {
        var self = this;

        /* Public interface */
        self.createNewSurvey = createNewSurvey;
        self.closeSurvey = closeSurvey;
        self.loadSurvey = loadSurvey;
        self.getCurrentSurvey = getCurrentSurvey;
        self.getCurrentQuestion = getCurrentQuestion;

        /* Public interface implementation */
        function createNewSurvey() {
            var survey = SurveyLoader.newSurvey();
            initializeEditing(survey);
        }

        function closeSurvey() {
            EditingService.close();
        }

        function saveSurvey() {
            EditingService.save();
        }

        function loadSurvey() {
            // A persisted survey object should be load here.
            // var survey = SurveyLoader.loadSurvey();
            // initializeEditing(survey);
        }

        function initializeEditing(survey) {
            EditingService.init(survey);
            EditingService.open();
        }

        function getCurrentSurvey() {
            return EditingService.getSurvey();
        }

        function getCurrentQuestion() {

        }

    }

}());
