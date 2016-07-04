(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('rangeDateValidator', rangeDateValidator);

    function rangeDateValidator(UUIDService) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/date/rangeDate-validation.html',

        };

        return ddo;
    }
}());
