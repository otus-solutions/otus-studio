(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusQuestionEditorToolbar', otusQuestionEditorToolbar);

    function otusQuestionEditorToolbar() {
        var ddo = {
            scope: {},
            restrict: 'E',
            controller: 'QuestionEditorToolbarController',
            templateUrl: 'app/editor/ui/question-editor-toolbar/question-editor-toolbar-template.html',
            link: function(scope, element) {
                scope.widget = scope.$parent.$parent.widget;
            }
        };

        return ddo;
    }

}());
