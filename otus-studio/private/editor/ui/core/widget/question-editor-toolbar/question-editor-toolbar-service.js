(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('QuestionEditorToolbarService', QuestionEditorToolbarService);

    QuestionEditorToolbarService.$inject = [
        'TemplateLoaderService',
    ];

    function QuestionEditorToolbarService(TemplateLoaderService) {
        var self = this;

        self.loadNavigation = loadNavigation;
        self.closeNavigation = closeNavigation;

        function loadNavigation(contentArea, scope){
            TemplateLoaderService.load('private/editor/ui/core/widget/navigation/question-navigation-template.html', scope, function (template){
                contentArea.append(template);
            })
        }

        function closeNavigation(contentArea){
            contentArea.empty();
        }
    }

}());
