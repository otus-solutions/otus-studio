(function() {
    'use strict';

    angular
        .module('editor.engine.core')
        .service('EditorEngineService', EditorEngineService);

    EditorEngineService.$inject = ['UpdaterFactory'];

    function EditorEngineService(UpdaterFactory) {
        const GENERAL_MEM_SIZE = 30;

        var self = this,
            currentSurvey,
            surveyMemoryCache, generalEditingMemoryCache;

        /* Public interface */
        self.init = init;
        self.open = open;
        self.close = close;
        self.save = save;
        self.editData = editData;
        self.getSurvey = getSurvey;

        /* Public interface implementation */
        function init(survey) {
            currentSurvey = survey;
            // surveyMemoryCache = new MemoryManagement();
            // generalEditingMemoryCache = new MemoryManagement(GENERAL_MEM_SIZE);
        }

        function open() {
            // var state = EditingState.generateOpen(self.survey);
            // surveyMemoryCache.storeState(state);
        }

        function close() {
            // EditingState.generateClose(self.survey);
        }

        function save() {
            // var state = EditingState.generateSave(self.survey);
            // surveyMemoryCache.storeState(state);
        }

        function getSurvey() {
            // return surveyMemoryCache.getMostRecentState().data;
        }

        function getCurrentQuestion() {

        }

        function editData(editingEvent) {
            var updater = UpdaterFactory.produceUpdater(editingEvent.target);
            updater.update(editingEvent, currentSurvey);

            console.log(currentSurvey);
            // generalEditingMemoryCache.storeState(editingEvent);
        }
    }

}());
