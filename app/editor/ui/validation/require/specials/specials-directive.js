(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusSpecialsValidator', otusSpecialsValidator);

    otusSpecialsValidator.$inject = [
        'SpecialsValidatorWidgetFactory'
    ];

    function otusSpecialsValidator(SpecialsValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/specials/specials-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = SpecialsValidatorWidgetFactory.create(scope, element);
            }
        };

        return ddo;
    }
}());
