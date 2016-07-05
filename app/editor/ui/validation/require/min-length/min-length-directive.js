(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusMinLengthValidator', otusMinLengthValidator);

    function otusMinLengthValidator() {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/min-length/min-length-validator.html',

        };

        return ddo;
    }

}());
