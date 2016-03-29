(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('questionEditorToolbar', questionEditorToolbar);


    function questionEditorToolbar() {
        var ddo = {
            scope: {},
            restrict: 'E',
            controller: 'QuestionEditorToolbarController',
            templateUrl: 'private/editor/ui/question-editor-toolbar/question-editor-toolbar-template.html',
            link: function(scope, element, attrs, controller) {
                scope.widget = scope.$parent.$parent.widget;
            }
        };

        return ddo;
    }

}());
