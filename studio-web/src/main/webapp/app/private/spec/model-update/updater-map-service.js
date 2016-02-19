(function() {
    'use strict';

    angular
        .module('spec')
        .service('UpdaterMapService', UpdaterMapService);

    UpdaterMapService.$inject = [
        'SurveyIdentityUpdateService',
        'SurveyQuestionsUpdateService',
        'LabelUpdateService',
        'UnitUpdateService',
        'QuestionAnswerOptionUpdateService'
    ];

    function UpdaterMapService(SurveyIdentityUpdateService, SurveyQuestionsUpdateService, LabelUpdateService, UnitUpdateService, QuestionAnswerOptionUpdateService) {
        var self = this,
            updaterMap = {
                'SurveyIdentityUpdateService': SurveyIdentityUpdateService,
                'SurveyQuestionsUpdateService': SurveyQuestionsUpdateService,
                'LabelUpdateService': LabelUpdateService,
                'UnitUpdateService': UnitUpdateService,
                'QuestionAnswerOptionUpdateService': QuestionAnswerOptionUpdateService
            };

        /* Public interface */
        self.getUpdater = getUpdater;

        function getUpdater(updaterName) {
            return updaterMap[updaterName];
        }
    }

}());
