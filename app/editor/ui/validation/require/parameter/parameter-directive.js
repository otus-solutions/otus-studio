(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusParameterValidator', otusParameterValidator);

    function otusParameterValidator() {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/parameter/parameter-validator.html',
            link: function linkFunc(scope) {
               scope.widget = scope.$parent.addedValidatorWidget;
            }
        };

        return ddo;
    }
}());
