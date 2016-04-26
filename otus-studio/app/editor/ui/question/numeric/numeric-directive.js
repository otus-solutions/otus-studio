(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('numericQuestion', numericQuestion);

    function numericQuestion() {
        var ddo = {
            scope: {
                ngModel: '=',
                ariaLabel: '@'
            },
            templateUrl: 'app/editor/ui/question/numeric/numeric-question.html',
            retrict: 'E'
        };

        return ddo;
    }

}());
