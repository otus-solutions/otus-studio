(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('SurveyItemSettingsContentService', SurveyItemSettingsContentService);

    SurveyItemSettingsContentService.$inject = [
        'TemplateLoaderService',
    ];

    function SurveyItemSettingsContentService(TemplateLoaderService) {
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
