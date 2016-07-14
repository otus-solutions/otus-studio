(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusMinTimeValidator', otusMinTimeValidator);

    function otusMinTimeValidator() {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/min-time/min-time-validator.html',
            link: function linkFunc(scope) {
               scope.widget = scope.$parent.addedValidatorWidget;
               scope.widget.element = element;
               scope.widget.directiveScope = scope;
            }
        };

        return ddo;
    }
}());
