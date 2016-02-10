(function() {
    'use strict';

    angular
        .module('protocolSpecification')
        .service('ModelUpdaterMapService', ModelUpdaterMapService);

    function ModelUpdaterMapService(UpdaterMapService) {
        var self = this,
            updaterMap = {
                survey: {
                    identity: {
                        name: 'SurveyIdentityUpdateService',
                        acronym: 'SurveyIdentityUpdateService',
                        version: 'SurveyIdentityUpdateService',
                        recommendedTo: 'SurveyIdentityUpdateService',
                        description: 'SurveyIdentityUpdateService',
                        keywords: 'SurveyIdentityUpdateService'
                    }
                }
            };

        /* Public interface */
        self.getUpdaterName = getUpdaterName;

        function getUpdaterName(editingTarget) {
            return searchUpdater(editingTarget);
        }

        function searchUpdater(editingTarget) {
            var targetPath = editingTarget.split('.');
            var reference = updaterMap;

            targetPath.forEach(function(path) {
                reference = reference[path];
            });

            return reference;
        }
    }

}());
