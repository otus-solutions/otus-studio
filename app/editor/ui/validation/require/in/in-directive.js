(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusInValidator', otusInValidator);

    function otusInValidator() {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/in/in-validator.html',
            link: function linkFunc(scope, element) {
               scope.widget = scope.$parent.addedValidatorWidget;
               scope.widget.element = element;
               scope.widget.directiveScope = scope;
            }
        };

        return ddo;
    }

}());
