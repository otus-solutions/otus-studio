(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('futureDateValidator', futureDateValidator);

    function futureDateValidator() {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/futureDate/futureDate-validation.html',

        };

        return ddo;
    }

}());
