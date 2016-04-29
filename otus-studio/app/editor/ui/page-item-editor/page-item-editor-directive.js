(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusPageItemEditor', otusPageItemEditor);

    function otusPageItemEditor() {
        var ddo = {
            scope: {
                widget: '@',
                label: '@',
                ariaLabel: '@',
                leftIcon: '@'
            },
            templateUrl: 'app/editor/ui/page-item-editor/page-item-editor.html',
            retrict: 'E',
            link: function linkFunc(scope, element, attrs, controller, transclude) {
                scope.widget = scope.$parent.widget;
            }
        };

        return ddo;
    }

}());
