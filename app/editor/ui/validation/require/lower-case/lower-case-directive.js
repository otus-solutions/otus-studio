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
            link: function linkFunc(scope) {
               scope.widget = scope.$parent.addedValidatorWidget;
            }
        };

        return ddo;
    }
}());
