(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('upperLimitValidator', upperLimitValidator);

    function upperLimitValidator() {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/upperLimitValidator/upperLimit-validation.html',

        };

        return ddo;
    }

}());
