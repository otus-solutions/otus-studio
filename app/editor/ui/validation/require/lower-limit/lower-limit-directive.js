(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusLowerLimitValidator', otusLowerLimitValidator);

    function otusLowerLimitValidator() {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/lower-limit/lower-limit-validator.html',
            link: function linkFunc(scope) {
               scope.widget = scope.$parent.addedValidatorWidget;
            }

        };

        return ddo;
    }

}());
