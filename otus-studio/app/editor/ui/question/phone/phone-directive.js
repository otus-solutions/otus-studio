(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('phoneQuestion', phoneQuestion);

    function phoneQuestion() {
        var ddo = {
            scope: {
                ngModel: '=',
                ariaLabel: '@'
            },
            templateUrl: 'app/editor/ui/question/numeric/phone-question.html',
            retrict: 'E'
        };

        return ddo;
    }

}());
