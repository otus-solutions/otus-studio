(function() {
    'use strict';

    angular
        .module('spec')
        .service('TargetToUpdaterMapServer', TargetToUpdaterMapServer);

    function TargetToUpdaterMapServer(UpdaterMapService) {
        var self = this;

        /* Public interface */
        self.getUpdaterName = getUpdaterName;

        function getUpdaterName(editingTarget) {
            return filter(editingTarget);
        }

        function filter(target) {
            var IDENTITY_REGEX = /^survey\.identity/;
            var QUESTION_CONTAINER_REGEX = /^survey\.question$/;
            var SELECTED_QUESTION_REGEX = /^survey\.question.[\d|\w|\-]+$/;
            var LABELS_REGEX = /survey\.questions\.[\d|\w|\-]+\.labels/;

            if (LABELS_REGEX.test(target)) {
                return 'LabelUpdateService';
            } else if (QUESTION_CONTAINER_REGEX.test(target)) {
                return 'SurveyQuestionsUpdateService';
            } else if (SELECTED_QUESTION_REGEX.test(target)) {
                return 'SurveyQuestionsUpdateService';
            } else if (IDENTITY_REGEX.test(target)) {
                return 'SurveyIdentityUpdateService';
            }

            return target;
        }
    }

}());
