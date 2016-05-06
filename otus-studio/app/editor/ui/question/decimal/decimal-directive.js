(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('decimalQuestion', decimalQuestion);

    function decimalQuestion() {
        var ddo = {
            scope: {
                ngModel: '=',
                ariaLabel: '@'
            },
            templateUrl: 'app/editor/ui/question/decimal/decimal-question.html',
            restrict: 'E'
        };
        return ddo;
    }

}());
