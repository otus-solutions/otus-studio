(function() {

    angular
        .module('spec')
        .service('SurveyIdentityUpdateService', SurveyIdentityUpdateService);

    function SurveyIdentityUpdateService() {
        var self = this;

        /* Public interface */
        self.update = update;

        /* Public interface implementation */
        function update(editingEvent, survey) {
            if (isKeywordsTargeted(editingEvent.target)) {
                updateKeywords(editingEvent, survey);
            } else {
                updateIdentityValue(editingEvent, survey);
            }
        }

        function isKeywordsTargeted(target) {
            return (target == 'survey.identity.keywords');
        }

        function updateKeywords(editingEvent, survey) {
            var keywords = editingEvent.state.domData.value.split(',');
            survey.identity.keywords = [];

            keywords.forEach(function(keyword) {
                keyword = keyword.trim();
                if (keyword.length > 0) {
                    survey.identity.keywords.push(keyword);
                }
            });
        }

        function updateIdentityValue(editingEvent, survey) {
            var target = searchTarget(editingEvent.target);
            survey.identity[target] = editingEvent.state.domData.value;
        }

        function searchTarget(editingTarget) {
            var targetPath = editingTarget.split('.');
            return targetPath[2];
        }
    }

}());
