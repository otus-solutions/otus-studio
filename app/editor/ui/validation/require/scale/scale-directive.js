(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusScaleValidator', otusScaleValidator);

    function otusScaleValidator() {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/scale/scale-validator.html',
            link: function linkFunc(scope) {
               scope.widget = scope.$parent.addedValidatorWidget;
            }
        };

        return ddo;
    }

}());
