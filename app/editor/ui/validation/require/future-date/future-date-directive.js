(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusFutureDateValidator', otusFutureDateValidator);

    function otusFutureDateValidator() {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/future-date/future-date-validator.html',
            link: function linkFunc(scope) {
               scope.widget = scope.$parent.addedValidatorWidget;
            }

        };

        return ddo;
    }

}());
