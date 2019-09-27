(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusMinDateValidator', otusMinDateValidator);

    otusMinDateValidator.$inject = [
        'MinDateValidatorWidgetFactory'
    ];

    function otusMinDateValidator(MinDateValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/min-date/min-date-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = MinDateValidatorWidgetFactory.create(scope, element);
            }
        };

        return ddo;
    }
}());
