(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusInputText', otusInputText);

    function otusInputText() {
        var ddo = {
            scope: {
                label: '@',
                ariaLabel: '@',
                leftIcon: '@'
            },
            transclude: true,
            templateUrl: 'app/editor/ui/base/input-text/input-text.html',
            controller: 'OtusInputTextController',
            retrict: 'E',
            link: function linkFunc(scope, element, attrs, controller, transclude) {
                scope.$emit('otusWidgetBinding', controller.component);
            }
        };

        return ddo;
    }

}());
