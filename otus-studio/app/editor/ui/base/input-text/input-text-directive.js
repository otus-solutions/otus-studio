(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusInputText', otusInputText);

    otusInputText.$inject = ['OtusInputTextWidgetFactory'];

    function otusInputText(OtusInputTextWidgetFactory) {
        var ddo = {
            scope: {
                flex: '@',
                label: '@',
                ariaLabel: '@',
                leftIcon: '@',
                style: '@',
                model: '='
            },
            templateUrl: 'app/editor/ui/base/input-text/input-text.html',
            retrict: 'E',
            link: function linkFunc(scope, element, attrs) {
                scope.widget = OtusInputTextWidgetFactory.create(attrs, element, scope.model, scope.$parent.widget || scope.$parent.$parent.childWidget);
            }
        };

        return ddo;
    }

}());
