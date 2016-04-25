(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusQuestion', otusQuestion);

    function otusQuestion() {
        var ddo = {
            scope: {
                widget: '='
            },
            transclude: true,
            templateUrl: 'app/editor/ui/core/widget/question/question.html',
            controller: 'OtusQuestionController',
            retrict: 'E'
        };

        return ddo;
    }

}());
