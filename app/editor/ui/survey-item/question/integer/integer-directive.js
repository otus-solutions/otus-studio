(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusIntegerQuestion', directive);

    function directive() {
        var ddo = {
            scope: {
                ngModel: '=',
                ariaLabel: '@'
            },
            templateUrl: 'app/editor/ui/survey-item/question/integer/integer-question.html',
            restrict: 'E'
        };
        return ddo;
    }

}());
