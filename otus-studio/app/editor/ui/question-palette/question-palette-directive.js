(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusQuestionPalette', otusInputText);

    function otusInputText() {
        var ddo = {
            scope: {
                label: '@',
                ariaLabel: '@',
                leftIcon: '@'
            },
            transclude: true,
            templateUrl: 'app/editor/ui/question-palette/question-palette.html',
            controller: 'OtusInputTextController',
            retrict: 'E',
            link: function linkFunc(scope, element, attrs, controller, transclude) {
                scope.$emit('otusWidgetBinding', controller.component);
            }
        };

        return ddo;
    }

}());
