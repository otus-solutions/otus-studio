(function() {

    angular
        .module('editor.engine.ui')
        .directive('timeQuestion', timeQuestion);

    timeQuestion.$inject = ['editor.engine.ui.mpath'];

    function timeQuestion(mpath) {
        var ddo = {
            templateUrl: mpath.getWidgetPath('time'),
            retrict: 'E'
        };

        return ddo;
    }

}());
