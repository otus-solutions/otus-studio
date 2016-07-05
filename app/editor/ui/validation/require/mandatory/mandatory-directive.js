(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusMandatoryValidator', otusMandatoryValidator);

    function otusMandatoryValidator() {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/mandatory/mandatory-validator.html',

        };

        return ddo;
    }

}());
