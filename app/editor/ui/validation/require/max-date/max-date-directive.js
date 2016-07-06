(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusMaxDateValidator', otusMaxDateValidator);

    function otusMaxDateValidator() {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/max-date/max-date-validator.html',

        };

        return ddo;
    }
}());
