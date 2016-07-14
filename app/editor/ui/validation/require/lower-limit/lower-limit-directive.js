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
            link: function linkFunc(scope, element) {
               scope.widget = scope.$parent.addedValidatorWidget;
               scope.widget.element = element;
               scope.widget.directiveScope = scope;
            }

        };

        return ddo;
    }

}());
