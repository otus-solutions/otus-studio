(function() {
    'use strict';

    angular
        .module('editor.ui')
        .controller('QuestionSettingsController', QuestionSettingsController);

    QuestionSettingsController.$inject = [
        '$scope',
        '$element',
        'TemplateLoaderService',
        'QuestionSettingsContentService'
    ];

    function QuestionSettingsController($scope, $element, TemplateLoaderService, QuestionSettingsContentService) {
        var self = this;

        self.navigation = navigation;

        function navigation(questionId) {
            var contentArea = $element.find('.toolbar-content-' + questionId);

            if (!contentArea.children().length) {
                QuestionSettingsContentService.loadNavigation(contentArea, $scope);
            } else {
                QuestionSettingsContentService.closeNavigation(contentArea);
            }
        }
    }

}());
