(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusLowerCaseValidator', otusLowerCaseValidator);

    function otusLowerCaseValidator() {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/lower-case/lower-case-validator.html',
            link: function linkFunc(scope, element) {
               scope.widget = scope.$parent.addedValidatorWidget;
               scope.widget.element = element;
               scope.widget.directiveScope = scope;
            }
        };

        return ddo;
    }
}());
