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
            var QUESTIONS_REGEX = /^survey\.questions$/;
            var LABELS_REGEX = /survey\.questions\.[\d|\w|\-]+\.labels/;

            if (LABELS_REGEX.test(target)) {
                return 'LabelUpdateService';
            } else if (QUESTIONS_REGEX.test(target)) {
                return 'SurveyQuestionsUpdateService';
            } else if (IDENTITY_REGEX.test(target)) {
                return 'SurveyIdentityUpdateService';
            }

            return target;
        }
    }

}());
