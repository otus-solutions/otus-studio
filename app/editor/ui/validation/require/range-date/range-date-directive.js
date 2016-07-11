(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusRangeDateValidator', otusRangeDateValidator);

    function otusRangeDateValidator() {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/range-date/range-date-validator.html',
            link: function linkFunc(scope) {
               scope.widget = scope.$parent.addedValidatorWidget;
            }

        };

        return ddo;
    }
}());
