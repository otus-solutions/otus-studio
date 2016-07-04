(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('mandatoryValidator', mandatoryValidator);

    function mandatoryValidator() {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/mandatoryValidator/mandatory-validation.html',

        };

        return ddo;
    }

}());
