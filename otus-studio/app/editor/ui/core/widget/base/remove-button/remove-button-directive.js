(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusRemoveButton', otusRemoveButton);

    function otusRemoveButton() {
        var ddo = {
            scope: {
                class: '@',
                label: '@',
                ariaLabel: '@',
                icon: '@',
                ngModel: '@'
            },
            transclude: true,
            templateUrl: 'app/editor/ui/core/widget/base/remove-button/remove-button.html',
            controller: 'OtusRemoveButtonController',
            retrict: 'E',
            link: function linkFunc(scope, element, attrs, controller, transclude) {
                scope.$emit('otusWidgetBinding', controller.component);
            }
        };

        return ddo;
    }

}());
