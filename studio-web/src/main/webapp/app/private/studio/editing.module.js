(function() {

    var module = angular.module('Editing', []);

    module.service('EditingService', ['Survey', 'EditingState',
        function(Survey, EditingState) {
            var self = this;

            /* Public interface */
            self.init = init;
            self.open = open;
            self.close = close;
            self.save = save;
            self.getSurvey = getSurvey;
            self.set = set;

            /* Public interface implementation */
            function init(survey) {
                self.survey = survey;
            }

            function open() {
                EditingState.storeOpen(self.survey);
            }

            function close() {
                EditingState.storeClose(self.survey);
            }

            function save() {
                EditingState.storeSave(self.survey);
            }

            function getSurvey() {
                return EditingState.currentState.survey;
            }

            function set(data) {

            }
        }
    ]);

    module.service('EditingState', [function() {
        var self = this;

        /* Public interface */
        self.currentState = {};
        self.storeOpen = storeOpen;
        self.storeClose = storeClose;
        self.storeSave = storeSave;

        /* Public interface implementation */
        function storeOpen(survey) {
            self.currentState = createState('OPENED', survey);
        }

        function storeClose(survey) {
            self.currentState = createState('OPENED', survey);
        }

        function storeSave(survey) {
            self.currentState = createState('OPENED', survey);
        }

        function createState(value, survey) {
            return {
                timestamp: Date.now(),
                value: value,
                survey: survey
            };
        }
    }]);

    module.service('SurveyLoader', ['Survey', function(Survey) {
        var self = this;

        /* Public interface */
        self.newSurvey = newSurvey;

        /* Public interface implementation */
        function newSurvey() {
            return new Survey();
        }
    }]);

    module.factory('Survey', ['SurveyIdentity', function(SurveyIdentity) {
        return function() {
            this.objectType = 'Survey';
            this.identity = new SurveyIdentity();
            this.questions = [];
        };
    }]);

    module.factory('SurveyIdentity', [function() {
        return function() {
            this.objectType = 'SurveyIdentity';
            this.name = '';
            this.acronym = '';
            this.version = '';
            this.recommendedTo = '';
            this.description = '';
            this.keywords = [];
        };
    }]);

}());
