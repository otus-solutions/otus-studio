(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusUpperCaseValidator', otusUpperCaseValidator);

    function otusUpperCaseValidator() {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/upperCase/upper-case-validator.html',
        };

        return ddo;
    }
}());
