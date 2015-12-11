(function() {

    var module = angular.module('StudioApp');

    module.service('Studio', ['SurveyLoader', 'EditingService',
        function(SurveyLoader, EditingService) {
            var self = this;

            /* Public interface */
            self.createNewSurvey = createNewSurvey;
            self.closeSurvey = closeSurvey;
            self.loadSurvey = loadSurvey;

            /* Public interface implementation */
            function createNewSurvey() {
                var survey = SurveyLoader.newSurvey();
                EditingService.init(survey);
                EditingService.open();
                console.log(EditingService.getSurvey());
            }

            function closeSurvey() {
                EditingService.close();
            }

            function loadSurvey() {
                // A persisted survey object should be load here
                // var survey = loadSurvey();
                EditingService.init(survey);
                EditingService.open();
            }
        }
    ]);

}());
