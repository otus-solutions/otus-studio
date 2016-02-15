(function() {
    'use strict';

    angular
        .module('spec')
        .service('TargetToUpdaterMapServer', TargetToUpdaterMapServer);

    function TargetToUpdaterMapServer(UpdaterMapService) {
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
                    },
                    questions: {
                        array: 'SurveyQuestionsUpdateService',
                        labels: {
                            content: {
                                text: 'LabelUpdateService'
                            }
                        }
                    }
                }
            };

        /* Public interface */
        self.getUpdaterName = getUpdaterName;

        function getUpdaterName(editingTarget) {
            var filteredTarget = filter(editingTarget);
            return searchUpdater(filteredTarget);
        }

        function searchUpdater(editingTarget) {
            var targetPath = editingTarget.split('.'),
                reference = updaterMap;

            targetPath.forEach(function(path) {
                reference = reference[path];
            });

            return reference;
        }

        function filter(target) {
            target = target.replace(/\[.\]/g, '');

            if (target == 'survey.questions') {
                target += '.array';
            }

            return target;
        }
    }

}());
