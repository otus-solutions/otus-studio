(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusPrecisionValidator', otusPrecisionValidator);

    otusPrecisionValidator.$inject = [
        'PrecisionValidatorWidgetFactory'
    ];

    function otusPrecisionValidator(PrecisionValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/precision/precision-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = PrecisionValidatorWidgetFactory.create(scope, element);
            }
        };

        return ddo;
    }
}());
