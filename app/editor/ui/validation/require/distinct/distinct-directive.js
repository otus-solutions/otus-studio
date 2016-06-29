(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('distinctValidator', distinctValidator);

    distinctValidator.$inject = [
        'UUIDService'
    ];

    function distinctValidator(UUIDService) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/distinct/distinct-validation.html',
            link: function linkFunc(scope, element, attrs) {
                scope.uuid = UUIDService.generateUUID();
                //TODO
            }
        };

        return ddo;
    }
}());
