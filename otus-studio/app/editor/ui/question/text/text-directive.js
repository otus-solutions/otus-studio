(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('textQuestion', textQuestion);

    textQuestion.$inject = ['editor.ui.mpath'];

    function textQuestion(mpath) {
        var ddo = {
            scope: {},
            templateUrl: 'app/editor/ui/question/text/text-question.html',
            retrict: 'E'
        };

        return ddo;
    }

}());
