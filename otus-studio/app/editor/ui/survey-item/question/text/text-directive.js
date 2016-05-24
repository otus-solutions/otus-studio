(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('textQuestion', textQuestion);

    function textQuestion() {
        var ddo = {
            scope: {},
            templateUrl: 'app/editor/ui/survey-item/question/text/text-question.html',
            retrict: 'E'
        };

        return ddo;
    }

}());
