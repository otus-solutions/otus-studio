(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusUpperCaseValidator', otusUpperCaseValidator);

    function otusUpperCaseValidator() {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/upper-case/upper-case-validator.html',
            link: function linkFunc(scope) {
               scope.widget = scope.$parent.addedValidatorWidget;
            }
        };

        return ddo;
    }
}());
