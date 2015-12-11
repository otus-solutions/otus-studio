(function() {

    var module = angular.module('editing', ['survey', 'memory']);

    module.service('EditingService', ['Survey', 'EditingState', 'MemoryService',
        function(Survey, EditingState, MemoryService) {
            var self = this;

            /* Public interface */
            self.init = init;
            self.open = open;
            self.close = close;
            self.save = save;
            self.getSurvey = getSurvey;

            /* Public interface implementation */
            function init(survey) {
                self.survey = survey;
            }

            function open() {
                var state = EditingState.generateOpen(self.survey);
                MemoryService.storeState(state);
            }

            function close() {
                EditingState.generateClose(self.survey);
            }

            function save() {
                var state = EditingState.generateSave(self.survey);
                MemoryService.storeState(state);
            }

            function getSurvey() {
                return getCurrentState().survey;
            }

            function getCurrentState() {
                return MemoryService.getMostRecentState();
            }
        }
    ]);

    module.service('EditingState', [function() {
        var self = this;

        /* Public interface */
        self.generateOpen = generateOpen;
        self.generateClose = generateClose;
        self.generateSave = generateSave;

        /* Public interface implementation */
        function generateOpen(survey) {
            return createState('OPENED', survey)
        }

        function generateClose(survey) {
            return createState('CLOSED', survey);
        }

        function generateSave(survey) {
            return createState('SAVED', survey);
        }

        function createState(value, survey) {
            return {
                timestamp: Date.now(),
                value: value,
                survey: survey
            };
        }
    }]);

}());
