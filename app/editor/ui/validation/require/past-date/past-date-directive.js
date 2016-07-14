(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusPastDateValidator', otusPastDateValidator);

    function otusPastDateValidator() {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/past-date/past-date-validator.html',
            link: function linkFunc(scope, element) {
               scope.widget = scope.$parent.addedValidatorWidget;
               scope.widget.element = element;
               scope.widget.directiveScope = scope;
            }

        };

        return ddo;
    }

}());
