(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('pastDateValidator', pastDateValidator);

    function pastDateValidator() {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/pastDateValidator/pastDate-validation.html',

        };

        return ddo;
    }

}());
