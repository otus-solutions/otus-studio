(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusPrecisionValidator', otusPrecisionValidator);

    function otusPrecisionValidator() {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/precision/precision-validator.html',
            link: function linkFunc(scope) {
               scope.widget = scope.$parent.addedValidatorWidget;
               scope.widget.element = element;
               scope.widget.directiveScope = scope;
            }
        };

        return ddo;
    }
}());
