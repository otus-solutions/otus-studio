(function() {
    'use strict';

    angular
        .module('otusjs')
        .service('SurveyIdentityUpdateService', SurveyIdentityUpdateService);

    function SurveyIdentityUpdateService() {
        var self = this;

        /* Public interface */
        self.update = update;

        /* Public interface implementation */
        function update(updateWork) {
            if (isKeywordsTargeted(updateWork.target)) {
                updateKeywords(updateWork);
            } else {
                updateIdentityValue(updateWork);
            }
        }

        function isKeywordsTargeted(target) {
            return (target == 'survey.identity.keywords');
        }

        function updateKeywords(updateWork) {
            var keywords = updateWork.data.value.split(',');
            updateWork.survey.identity.keywords = [];

            keywords.forEach(function(keyword) {
                keyword = keyword.trim();
                if (keyword.length > 0) {
                    updateWork.survey.identity.keywords.push(keyword);
                }
            });
        }

        function updateIdentityValue(updateWork) {
            var target = searchTarget(updateWork.target);
            updateWork.survey.identity[target] = updateWork.data.value;
        }

        function searchTarget(editingTarget) {
            var targetPath = editingTarget.split('.');
            return targetPath[2];
        }
    }

}());
