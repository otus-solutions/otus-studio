(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusQuestionPalette', directive);

    directive.$inject = ['OtusQuestionPaletteWidgetFactory'];

    function directive(OtusQuestionPaletteWidgetFactory) {
        var ddo = {
            scope: {
                label: '@',
                ariaLabel: '@',
                leftIcon: '@'
            },
            transclude: true,
            templateUrl: 'app/editor/ui/question-palette/question-palette.html',
            retrict: 'E',
            link: function linkFunc(scope) {
                scope.widget = OtusQuestionPaletteWidgetFactory.create(scope.$parent.widget);
            }
        };

        return ddo;
    }

}());
