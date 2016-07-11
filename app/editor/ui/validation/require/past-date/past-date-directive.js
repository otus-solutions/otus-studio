(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusPastDateValidator', otusPastDateValidator);

    function otusPastDateValidator() {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/past-date/past-date-validator.html',
            link: function linkFunc(scope) {
               scope.widget = scope.$parent.addedValidatorWidget;
            }

        };

        return ddo;
    }

}());
