(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('minLengthValidator', minLengthValidator);

    function minLengthValidator() {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/minLengthValidator/minLength-validation.html',

        };

        return ddo;
    }

}());
