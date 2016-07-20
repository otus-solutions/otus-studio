(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusScaleValidator', otusScaleValidator);

    otusScaleValidator.$inject = [
        'ScaleValidatorWidgetFactory'
    ];

    function otusScaleValidator(ScaleValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/scale/scale-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = ScaleValidatorWidgetFactory.create(scope, element);
            }
        };

        return ddo;
    }

}());
