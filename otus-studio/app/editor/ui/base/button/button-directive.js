(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusButton', directive);

    directive.$inject = ['OtusButtonWidgetFactory'];

    function directive(OtusButtonWidgetFactory) {
        var ddo = {
            scope: {
                ariaLabel: '@',
                context: '=',
                class: '@',
                click: '=',
                icon: '@',
                label: '@',
                leftIcon: '@',
                model: '=',
                ngModel: '@',
                tooltip: '@'
            },
            templateUrl: 'app/editor/ui/base/button/button.html',
            retrict: 'E',
            link: function linkFunc(scope, element) {
                scope.widget = OtusButtonWidgetFactory.create(scope, element, scope.$parent.widget);
            }
        };

        return ddo;
    }

}());
