(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('rangeDateValidator', rangeDateValidator);

    rangeDateValidator.$inject = [
        'UUIDService'
    ];

    function rangeDateValidator(UUIDService) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/date/rangeDate-validation.html',
            link: function linkFunc(sope, element, attrs) {
                scope.uuid = UUIDService.generateUUID();
                //TODO
            }
        };

        return ddo;
    }
}());
