(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('timeQuestion', timeQuestion);

    timeQuestion.$inject = ['editor.ui.mpath'];

    function timeQuestion(mpath) {
        var ddo = {
            templateUrl: mpath.getWidgetPath('time'),
            retrict: 'E'
        };

        return ddo;
    }

}());
