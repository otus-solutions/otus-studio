(function() {
    'use strict';

    angular
        .module('otusjs.modelBuilder')
        .service('SurveyIdentityBuilderService', SurveyIdentityBuilderService);

    function SurveyIdentityBuilderService() {
        var self = this,
            workResult = null;

        /* Public interface */
        self.runValidations = runValidations;
        self.execute = execute;
        self.getWorkResult = getWorkResult;

        // TODO: Implement validator to run here
        function runValidations(work) {
            workResult = true;
        }

        function getWorkResult() {
            return {
                result: workResult
            };
        }

        function execute(work) {
            if (isKeywordsTargeted(work.target)) {
                updateKeywords(work);
            } else {
                updateIdentityValue(work);
            }
        }

        function isKeywordsTargeted(target) {
            return (target == 'survey.getIdentity().keywords');
        }

        function updateKeywords(work) {
            var keywords = work.data.value.split(',');
            work.survey.getIdentity().keywords = [];

            keywords.forEach(function(keyword) {
                keyword = keyword.trim();
                if (keyword.length > 0) {
                    work.survey.getIdentity().keywords.push(keyword);
                }
            });
        }

        function updateIdentityValue(work) {
            var target = searchTarget(work.target);
            work.survey.getIdentity()[target] = work.data.value;
        }

        function searchTarget(editingTarget) {
            var targetPath = editingTarget.split('.');
            return targetPath[2];
        }
    }

}());
