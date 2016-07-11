(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusMinDateValidator', otusMinDateValidator);

    function otusMinDateValidator() {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/min-date/min-date-validator.html',
            link: function linkFunc(scope) {
               scope.widget = scope.$parent.addedValidatorWidget;
            }
        };

        return ddo;
    }
}());
