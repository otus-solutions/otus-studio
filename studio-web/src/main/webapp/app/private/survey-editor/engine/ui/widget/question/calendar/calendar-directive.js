(function() {

    angular
        .module('editor.engine.ui')
        .directive('calendarQuestion', calendarQuestion);

    calendarQuestion.$inject = ['editor.engine.ui.mpath'];

    function calendarQuestion(mpath) {
        var ddo = {
            templateUrl: mpath.getWidgetPath('calendar'),
            retrict: 'E'
        };

        return ddo;
    }

}());
