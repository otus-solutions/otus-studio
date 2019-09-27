(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusSurveyItemPalette', directive);

    directive.$inject = ['OtusSurveyItemPaletteWidgetFactory'];

    function directive(OtusSurveyItemPaletteWidgetFactory) {
        var ddo = {
            scope: {
                label: '@',
                ariaLabel: '@',
                leftIcon: '@'
            },
            transclude: true,
            templateUrl: 'app/editor/ui/survey-item-palette/survey-item-palette.html',
            retrict: 'E',
            link: function linkFunc(scope) {
                scope.widget = OtusSurveyItemPaletteWidgetFactory.create(scope.$parent.widget);
            }
        };

        return ddo;
    }

}());
