(function() {

    angular
        .module('editor.engine.core')
        .service('EditorService', ['Survey', 'SurveyDataUpdater', 'EditingState', 'MemoryManagement', EditorService]);

    function EditorService(Survey, SurveyDataUpdater, EditingState, MemoryManagement) {
        const GENERAL_MEM_SIZE = 30;

        var self = this;
        var surveyMemoryCache, generalEditingMemoryCache;

        /* Public interface */
        self.init = init;
        self.open = open;
        self.close = close;
        self.save = save;
        self.editData = editData;
        self.getSurvey = getSurvey;

        /* Public interface implementation */
        function init(survey) {
            self.survey = survey;
            surveyMemoryCache = new MemoryManagement();
            generalEditingMemoryCache = new MemoryManagement(GENERAL_MEM_SIZE);
        }

        function open() {
            var state = EditingState.generateOpen(self.survey);
            surveyMemoryCache.storeState(state);
        }

        function close() {
            EditingState.generateClose(self.survey);
        }

        function save() {
            var state = EditingState.generateSave(self.survey);
            surveyMemoryCache.storeState(state);
        }

        function getSurvey() {
            return surveyMemoryCache.getMostRecentState().data;
        }

        function getCurrentQuestion() {

        }

        function editData(editingEvent) {
            console.log(editingEvent);
            // validate editingEvent
            // log editingEvent
            generalEditingMemoryCache.storeState(editingEvent);

            if (editingEvent.type == 'update-model') {
                SurveyDataUpdater.update(editingEvent, getSurvey());
            }
            console.log(getSurvey());
        }
    }

}());
