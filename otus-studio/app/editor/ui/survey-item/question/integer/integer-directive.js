(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('integerQuestion', integerQuestion);

    function integerQuestion() {
        var ddo = {
            scope: {
                ngModel: '=',
                ariaLabel: '@'
            },
            templateUrl: 'app/editor/ui/survey-item/question/integer/integer-question.html',
            retrict: 'E'
        };
        return ddo;
    }

}());
