(function() {
    'use strict';

    angular
        .module('editor.engine.core')
        .service('StudioEditorService', StudioEditorService);

    StudioEditorService.$inject = ['EditorEngineService'];

    function StudioEditorService(EditorEngineService) {
        var self = this;

        /* Public interface */
        self.createNewSurvey = createNewSurvey;
        self.closeSurvey = closeSurvey;
        self.loadSurvey = loadSurvey;
        self.getCurrentSurvey = getCurrentSurvey;

        /* Public interface implementation */
        function createNewSurvey() {
            var survey = EditorEngineService.initializeNewSurvey();
        }

        function closeSurvey() {
            SurveyEditorService.close();
        }

        function saveSurvey() {
            SurveyEditorService.save();
        }

        function loadSurvey() {
            SurveyEditorService.loadSurvey();
        }

        function getCurrentSurvey() {
            return EditorEngineService.getSurvey();
        }

    }

}());
