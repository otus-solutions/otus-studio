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
            link: function linkFunc(scope) {
               scope.widget = scope.$parent.addedValidatorWidget;
            }
        };

        return ddo;
    }

}());
