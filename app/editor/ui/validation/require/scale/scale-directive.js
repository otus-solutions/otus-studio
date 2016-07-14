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
            link: function linkFunc(scope, element) {
               scope.widget = scope.$parent.addedValidatorWidget;
               scope.widget.element = element;
               scope.widget.directiveScope = scope;
            }
        };

        return ddo;
    }

}());
