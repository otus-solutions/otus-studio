(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('distinctValidator', distinctValidator);

    function distinctValidator() {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/distinct/distinct-validation.html',
        };

        return ddo;
    }
}());
