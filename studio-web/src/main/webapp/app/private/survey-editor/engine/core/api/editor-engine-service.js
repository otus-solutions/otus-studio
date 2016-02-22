(function() {
    'use strict';

    angular
        .module('editor.engine.core')
        .service('EditorEngineService', EditorEngineService);

    EditorEngineService.$inject = ['SurveyLoaderService', 'ModelService', 'UpdateWorkFactory'];

    function EditorEngineService(SurveyLoaderService, ModelService, UpdateWorkFactory) {
        var self = this,
            survey = null;

        /* Public interface */
        self.newSurvey = newSurvey;
        self.closeSurvey = closeSurvey;
        self.loadSurvey = loadSurvey;
        self.getSurvey = getSurvey;
        self.editData = editData;

        function newSurvey() {
            survey = SurveyLoaderService.newSurvey();
            console.info('New survey initialized.');
        }

        function closeSurvey() {
            console.info('Current survey closed.');
        }

        function saveSurvey() {
            console.info('Current survey saved.');
        }

        function loadSurvey() {
            // A persisted survey object should be load here.
            // var survey = SurveyLoader.loadSurvey();
            // initializeEditing(survey);
            console.info('Survey loaded.');
        }

        function getSurvey() {
            return survey;
        }

        function editData(editingEvent) {
            ModelService.update(buildUpdateWork(editingEvent));
        }

        function buildUpdateWork(editingEvent) {
            var updateWork = UpdateWorkFactory.create();
            updateWork.survey = getSurvey();
            updateWork.target = editingEvent.target;

            if (editingEvent.state.domData)
                updateWork.data = editingEvent.state.domData;

            updateWork.type = editingEvent.type;
            updateWork.model = editingEvent.source.model;

            return updateWork;
        }
    }

}());
