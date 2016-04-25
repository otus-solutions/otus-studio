(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('timeQuestion', timeQuestion);

    timeQuestion.$inject = ['editor.ui.mpath'];

    function timeQuestion(mpath) {
        var ddo = {
            scope: {},
            templateUrl: 'app/editor/ui/question/time/time-question.html',
            retrict: 'E'
        };

        return ddo;
    }

}());
