(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusMinTimeValidator', otusMinTimeValidator);

    otusMinTimeValidator.$inject = [
        'MinTimeValidatorWidgetFactory'
    ];

    function otusMinTimeValidator(MinTimeValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/min-time/min-time-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = MinTimeValidatorWidgetFactory.create(scope, element);
            }
        };

        return ddo;
    }
}());
