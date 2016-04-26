(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('timeQuestion', timeQuestion);

    function timeQuestion() {
        var ddo = {
            scope: {},
            templateUrl: 'app/editor/ui/question/time/time-question.html',
            retrict: 'E'
        };

        return ddo;
    }

}());
