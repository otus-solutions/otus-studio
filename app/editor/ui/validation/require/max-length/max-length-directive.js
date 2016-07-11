(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusMaxLengthValidator', otusMaxLengthValidator);

    function otusMaxLengthValidator() {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/max-length/max-length-validator.html',
            link: function linkFunc(scope) {
               scope.widget = scope.$parent.addedValidatorWidget;
            }

        };

        return ddo;
    }

}());
