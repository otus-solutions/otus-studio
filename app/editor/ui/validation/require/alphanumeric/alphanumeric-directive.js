(function () {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusAlphanumericValidator', otusAlphanumericValidator);

    function otusAlphanumericValidator() {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/alphanumeric/alphanumeric-validator.html',
            // link: function (scope, element, attr, ngModel){
            //     var validator = function(value) {
            //         //TODO
            //     }
            }
        };

        return ddo;

    }

}());
