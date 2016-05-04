(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('QuestionSettingsContentService', QuestionSettingsContentService);

    QuestionSettingsContentService.$inject = [
        'TemplateLoaderService',
    ];

    function QuestionSettingsContentService(TemplateLoaderService) {
        var self = this;

        self.loadNavigation = loadNavigation;
        self.closeNavigation = closeNavigation;

        function loadNavigation(contentArea, scope) {
            TemplateLoaderService.load(NAVIGATION_TEMPLATE, scope, function(template) {
                contentArea.append(template);
            });
        }

        function closeNavigation(contentArea) {
            contentArea.empty();
        }
    }

}());
