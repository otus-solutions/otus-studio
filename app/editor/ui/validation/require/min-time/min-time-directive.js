(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusMinTimeValidator', otusMinTimeValidator);

    function otusMinTimeValidator() {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/min-time/min-time-validator.html',
        };

        return ddo;
    }
}());
