(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusFutureDateValidator', otusFutureDateValidator);

    otusFutureDateValidator.$inject = [
        'FutureDateValidatorWidgetFactory'
    ];

    function otusFutureDateValidator(FutureDateValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/future-date/future-date-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = FutureDateValidatorWidgetFactory.create(scope, element);
            }

        };

        return ddo;
    }

}());
