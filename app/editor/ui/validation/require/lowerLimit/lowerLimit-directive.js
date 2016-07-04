(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('lowerLimitValidator', lowerLimitValidator);

    function lowerLimitValidator() {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/lowerLimit/lowerLimit-validation.html',

        };

        return ddo;
    }

}());
