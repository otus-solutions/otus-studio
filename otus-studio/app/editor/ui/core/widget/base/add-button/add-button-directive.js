(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusAddButton', otusAddButton);

    function otusAddButton() {
        var ddo = {
            scope: {
                class: '@',
                label: '@',
                ariaLabel: '@',
                leftIcon: '@',
                ngModel: '@'
            },
            transclude: true,
            templateUrl: 'app/editor/ui/core/widget/base/add-button/add-button.html',
            controller: 'OtusAddButtonController',
            retrict: 'E',
            link: function linkFunc(scope, element, attrs, controller, transclude) {
                scope.$emit('otusWidgetBinding', controller.component);
            }
        };

        return ddo;
    }

}());
