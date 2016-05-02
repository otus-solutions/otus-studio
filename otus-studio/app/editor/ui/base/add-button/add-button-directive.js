(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusAddButton', otusAddButton);

    otusAddButton.$inject = ['OtusAddButtonWidgetFactory'];

    function otusAddButton(OtusAddButtonWidgetFactory) {
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
            templateUrl: 'app/editor/ui/base/add-button/add-button.html',
            retrict: 'E',
            link: function linkFunc(scope, element, attrs) {
                scope.widget = OtusAddButtonWidgetFactory.create(attrs, element, scope.model, scope.$parent.widget);
            }
        };

        return ddo;
    }

}());
