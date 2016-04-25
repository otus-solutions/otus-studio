(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('calendarQuestion', calendarQuestion);

    calendarQuestion.$inject = ['editor.ui.mpath'];

    function calendarQuestion(mpath) {
        var ddo = {
            scope: {},
            templateUrl: 'app/editor/ui/question/calendar/calendar-question.html',
            retrict: 'E'
        };

        return ddo;
    }

}());
