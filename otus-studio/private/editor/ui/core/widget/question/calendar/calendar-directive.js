(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('calendarQuestion', calendarQuestion);

    calendarQuestion.$inject = ['editor.ui.mpath'];

    function calendarQuestion(mpath) {
        var ddo = {
            templateUrl: mpath.getWidgetPath('calendar'),
            retrict: 'E'
        };

        return ddo;
    }

}());
