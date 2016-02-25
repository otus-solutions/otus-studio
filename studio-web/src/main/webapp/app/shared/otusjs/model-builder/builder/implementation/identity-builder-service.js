(function() {
    'use strict';

    angular
        .module('otusjs.modelBuilder')
        .service('SurveyIdentityBuilderService', SurveyIdentityBuilderService);

    function SurveyIdentityBuilderService() {
        var self = this;

        /* Public interface */
        self.execute = execute;

        /* Public interface implementation */
        function execute(work) {
            if (isKeywordsTargeted(work.target)) {
                updateKeywords(work);
            } else {
                updateIdentityValue(work);
            }
        }

        function isKeywordsTargeted(target) {
            return (target == 'survey.identity.keywords');
        }

        function updateKeywords(work) {
            var keywords = work.data.value.split(',');
            work.survey.identity.keywords = [];

            keywords.forEach(function(keyword) {
                keyword = keyword.trim();
                if (keyword.length > 0) {
                    work.survey.identity.keywords.push(keyword);
                }
            });
        }

        function updateIdentityValue(work) {
            var target = searchTarget(work.target);
            work.survey.identity[target] = work.data.value;
        }

        function searchTarget(editingTarget) {
            var targetPath = editingTarget.split('.');
            return targetPath[2];
        }
    }

}());
