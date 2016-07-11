(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusDistinctValidator', otusDistinctValidator);

    function otusDistinctValidator() {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/distinct/distinct-validator.html',
            link: function linkFunc(scope) {
               scope.widget = scope.$parent.addedValidatorWidget;
            }
        };

        return ddo;
    }
}());
