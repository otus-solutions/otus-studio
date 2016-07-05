(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusUpperLimitValidator', otusUpperLimitValidator);

    function otusUpperLimitValidator() {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/upper-limit/upper-limit-validator.html',

        };

        return ddo;
    }

}());
