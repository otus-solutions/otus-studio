(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusMinLengthValidator', otusMinLengthValidator);

    otusMinLengthValidator.$inject = [
        'MinLengthValidatorWidgetFactory'
    ];

    function otusMinLengthValidator(MinLengthValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/min-length/min-length-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = MinLengthValidatorWidgetFactory.create(scope, element);
            }

        };

        return ddo;
    }

}());
