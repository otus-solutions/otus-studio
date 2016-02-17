(function() {
    'use strict';

    angular
        .module('editor.engine.core')
        .service('EditorEngineService', EditorEngineService);

    EditorEngineService.$inject = ['SurveyLoaderService', 'ModelService', 'UpdateWorkFactory'];

    function EditorEngineService(SurveyLoaderService, ModelService, UpdateWorkFactory) {
        var self = this,
            currentSurvey = null;
        self.currentQuestionList = [];

        /* Public interface */
        self.initializeNewSurvey = initializeNewSurvey;
        self.getCurrentSurvey = getCurrentSurvey;
        self.editData = editData;

        function initializeNewSurvey() {
            currentSurvey = SurveyLoaderService.newSurvey();
            self.currentQuestionList = [];
            console.info('New survey initialized.');

            // surveyMemoryCache = new MemoryManagement();
            // generalEditingMemoryCache = new MemoryManagement(GENERAL_MEM_SIZE);
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

        function getCurrentSurvey() {
            return currentSurvey;
        }

        function editData(editingEvent) {
            console.log(editingEvent);
            var updateWork = UpdateWorkFactory.create();
            updateWork.survey = currentSurvey;
            updateWork.target = editingEvent.target;

            if (editingEvent.state.domData)
                updateWork.data = editingEvent.state.domData;

            updateWork.type = editingEvent.type;
            updateWork.model = editingEvent.source.model;

            console.log(updateWork);

            ModelService.update(updateWork);
            console.log(currentSurvey);
            // generalEditingMemoryCache.storeState(editingEvent);
        }
    }

}());
