(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusSpecialsValidator', otusSpecialsValidator);

    function otusSpecialsValidator() {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/specials/specials-validator.html',
            link: function linkFunc(scope) {
               scope.widget = scope.$parent.addedValidatorWidget;
            }
        };

        return ddo;
    }
}());
