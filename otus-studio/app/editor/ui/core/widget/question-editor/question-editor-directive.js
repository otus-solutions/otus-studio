(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusQuestionEditor', otusQuestionEditor);

    function otusQuestionEditor() {
        var ddo = {
            scope: {
                widget: '@',
                label: '@',
                ariaLabel: '@',
                leftIcon: '@'
            },
            transclude: true,
            templateUrl: 'app/editor/ui/core/widget/question-editor/question-editor.html',
            controller: 'OtusQuestionEditorController',
            retrict: 'E',
            link: function linkFunc(scope, element, attrs, controller, transclude) {
                scope.widget = scope.$parent.widget;
            }
        };

        return ddo;
    }

}());
