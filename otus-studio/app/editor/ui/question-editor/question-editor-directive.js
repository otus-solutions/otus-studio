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
            templateUrl: 'app/editor/ui/question-editor/question-editor.html',
            retrict: 'E',
            link: function linkFunc(scope, element, attrs, controller, transclude) {
                scope.widget = scope.$parent.widget;
            }
        };

        return ddo;
    }

}());
