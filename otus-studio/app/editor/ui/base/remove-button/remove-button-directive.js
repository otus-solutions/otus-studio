(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusRemoveButton', otusRemoveButton);

    otusRemoveButton.$inject = ['OtusRemoveButtonWidgetFactory'];

    function otusRemoveButton(OtusRemoveButtonWidgetFactory) {
        var ddo = {
            scope: {
                class: '@',
                label: '@',
                tooltip: '@',
                ariaLabel: '@',
                leftIcon: '@',
                icon: '@',
                ngModel: '@',
                context: '=',
                model: '='
            },
            templateUrl: 'app/editor/ui/base/remove-button/remove-button.html',
            retrict: 'E',
            link: function linkFunc(scope, element, attrs) {
                var model, parentWidget;
                if (scope.$parent.widget) {
                    model = scope.model;
                    parentWidget = scope.$parent.widget;
                } else {
                    model = scope.$parent.$parent.route.route;
                    parentWidget = scope.$parent.$parent.route;
                }
                scope.widget = OtusRemoveButtonWidgetFactory.create(attrs, element, model, parentWidget);
            }
        };

        return ddo;
    }

}());
