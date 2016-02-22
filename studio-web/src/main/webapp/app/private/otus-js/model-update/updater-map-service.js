(function() {
    'use strict';

    angular
        .module('otusjs')
        .service('UpdaterMapService', UpdaterMapService);

    UpdaterMapService.$inject = [
        'SurveyIdentityUpdateService',
        'SurveyQuestionsUpdateService',
        'LabelUpdateService',
        'UnitUpdateService',
        'AnswerOptionUpdateService'
    ];

    function UpdaterMapService(SurveyIdentityUpdateService, SurveyQuestionsUpdateService, LabelUpdateService, UnitUpdateService, AnswerOptionUpdateService) {
        var self = this,
            updaterMap = {
                'SurveyIdentityUpdateService': SurveyIdentityUpdateService,
                'SurveyQuestionsUpdateService': SurveyQuestionsUpdateService,
                'LabelUpdateService': LabelUpdateService,
                'UnitUpdateService': UnitUpdateService,
                'AnswerOptionUpdateService': AnswerOptionUpdateService
            };

        /* Public interface */
        self.getUpdater = getUpdater;

        function getUpdater(updaterName) {
            return updaterMap[updaterName];
        }
    }

}());
