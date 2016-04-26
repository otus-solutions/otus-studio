(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('calendarQuestion', calendarQuestion);

    function calendarQuestion() {
        var ddo = {
            scope: {},
            templateUrl: 'app/editor/ui/question/calendar/calendar-question.html',
            retrict: 'E'
        };

        return ddo;
    }

}());
