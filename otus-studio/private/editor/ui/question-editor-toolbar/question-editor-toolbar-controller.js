(function() {
    'use strict';

    angular
        .module('editor.ui')
        .controller('QuestionEditorToolbarController', QuestionEditorToolbarController);

    QuestionEditorToolbarController.$inject = [
        '$scope',
        '$element',
        'TemplateLoaderService',
        'QuestionEditorToolbarService'
    ];

    function QuestionEditorToolbarController($scope, $element, TemplateLoaderService, QuestionEditorToolbarService) {
        var self = this;

        self.navigation = navigation;

        function navigation(questionId) {
            var contentArea = $element.find('.toolbar-content-' + questionId);

            if (!contentArea.children().length) {
                QuestionEditorToolbarService.loadNavigation(contentArea, $scope);
            } else {
                QuestionEditorToolbarService.closeNavigation(contentArea);
            }
        }
    }

}());
