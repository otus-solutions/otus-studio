(function() {
    'use strict';

    angular
        .module('protocolSpecification')
        .service('UpdaterMapService', UpdaterMapService);

    function UpdaterMapService(SurveyIdentityUpdateService) {
        var self = this,
            updaterMap = {
                'SurveyIdentityUpdateService': SurveyIdentityUpdateService
            };

        /* Public interface */
        self.getUpdater = getUpdater;

        function getUpdater(updaterName) {
            return updaterMap[updaterName];
        }
    }

}());
