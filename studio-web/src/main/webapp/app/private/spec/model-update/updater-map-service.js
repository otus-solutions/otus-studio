(function() {
    'use strict';

    angular
        .module('spec')
        .service('UpdaterMapService', UpdaterMapService);

    UpdaterMapService.$inject = [
        'SurveyIdentityUpdateService',
        'SurveyQuestionsUpdateService',
        'LabelUpdateService'
    ];

    function UpdaterMapService(SurveyIdentityUpdateService, SurveyQuestionsUpdateService, LabelUpdateService) {
        var self = this,
            updaterMap = {
                'SurveyIdentityUpdateService': SurveyIdentityUpdateService,
                'SurveyQuestionsUpdateService': SurveyQuestionsUpdateService,
                'LabelUpdateService': LabelUpdateService
            };

        /* Public interface */
        self.getUpdater = getUpdater;

        function getUpdater(updaterName) {
            return updaterMap[updaterName];
        }
    }

}());
