(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusDecimalQuestion', directive);

    function directive() {
        var ddo = {
            scope: {
                ngModel: '=',
                ariaLabel: '@'
            },
            templateUrl: 'app/editor/ui/survey-item/question/decimal/decimal-question.html',
            restrict: 'E'
        };
        return ddo;
    }

}());
