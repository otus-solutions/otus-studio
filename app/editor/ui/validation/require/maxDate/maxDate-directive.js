(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('maxDateValidator', maxDateValidator);

    function maxDateValidator() {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/maxDate/maxDate-validation.html',

        };

        return ddo;
    }
})
