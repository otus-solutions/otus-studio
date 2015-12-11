(function() {

    var module = angular.module('StudioApp');

    module.service('Studio', ['SurveyLoader', 'EditingService',
        function(SurveyLoader, EditingService) {
            var self = this;

            /* Public interface */
            self.createNewSurvey = createNewSurvey;
            self.closeSurvey = closeSurvey;
            self.loadSurvey = loadSurvey;
            self.getCurrentSurvey = getCurrentSurvey;

            /* Public interface implementation */
            function createNewSurvey() {
                var survey = SurveyLoader.newSurvey();
                initializeEditing(survey);
            }

            function closeSurvey() {
                EditingService.close();
            }

            function loadSurvey() {
                // A persisted survey object should be load here
                // var survey = loadSurvey();
                // initializeEditing(survey);
            }

            function initializeEditing(survey) {
                EditingService.init(survey);
                EditingService.open();
            }

            function getCurrentSurvey() {
                return EditingService.getSurvey();
            }
        }
    ]);

}());
