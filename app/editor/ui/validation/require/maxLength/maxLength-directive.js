(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('maxLengthValidator', maxLengthValidator);

    function maxLengthValidator() {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/maxLengthValidator/maxLength-validation.html',

        };

        return ddo;
    }

}());
