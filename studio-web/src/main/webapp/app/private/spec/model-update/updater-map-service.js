(function() {
    'use strict';

    angular
        .module('spec')
        .service('UpdaterMapService', UpdaterMapService);

    UpdaterMapService.$inject = ['SurveyIdentityUpdateService', 'SurveyQuestionsUpdateService'];

    function UpdaterMapService(SurveyIdentityUpdateService, SurveyQuestionsUpdateService) {
        var self = this,
            updaterMap = {
                'SurveyIdentityUpdateService': SurveyIdentityUpdateService,
                'SurveyQuestionsUpdateService': SurveyQuestionsUpdateService
            };

        /* Public interface */
        self.getUpdater = getUpdater;

        function getUpdater(updaterName) {
            return updaterMap[updaterName];
        }
    }

}());
