(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('emailQuestion', textQuestion);

    function textQuestion() {
        var ddo = {
            scope: {},
            templateUrl: 'app/editor/ui/survey-item/question/email/email-question.html',
            retrict: 'E'
        };

        return ddo;
    }

}());
