(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('QuestionEditorToolbarService', QuestionEditorToolbarService);

    QuestionEditorToolbarService.$inject = [
        'TemplateLoaderService',
    ];

    function QuestionEditorToolbarService(TemplateLoaderService) {
        var NAVIGATION_TEMPLATE = "private/editor/ui/navigation/question-navigation-template.html";
        var self = this;

        self.loadNavigation = loadNavigation;
        self.closeNavigation = closeNavigation;

        function loadNavigation(contentArea, scope){
            TemplateLoaderService.load(NAVIGATION_TEMPLATE, scope, function (template){
                contentArea.append(template);
            })
        }

        function closeNavigation(contentArea){
            contentArea.empty();
        }
    }

}());
