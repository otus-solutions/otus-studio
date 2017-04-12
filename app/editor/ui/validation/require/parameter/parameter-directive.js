(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusParameterValidator', otusParameterValidator);

    otusParameterValidator.$inject = [
        'ParameterValidatorWidgetFactory'
    ];

    function otusParameterValidator(ParameterValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/parameter/parameter-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = ParameterValidatorWidgetFactory.create(scope, element);
            }
        };

        return ddo;
    }
}());
