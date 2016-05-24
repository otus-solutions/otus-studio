(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('phoneQuestion', phoneQuestion);

    function phoneQuestion() {
        var ddo = {
            scope: {
                ngModel: '=',
                ariaLabel: '@'
            },
            templateUrl: 'app/editor/ui/survey-item/question/phone/phone-question.html',
            retrict: 'E'
        };

        return ddo;
    }

}());
