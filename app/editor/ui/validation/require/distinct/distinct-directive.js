(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusDistinctValidation', distinctValidation);

    function distinctValidation() {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/distinct/distinct-validation.html'
        };

        return ddo;
    }
}());
