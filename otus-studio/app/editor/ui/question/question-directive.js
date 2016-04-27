(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusQuestion', otusQuestion);

    otusQuestion.$inject = [
        'QuestionWidgetFactory',
        'SheetContentService'
    ];

    function otusQuestion(QuestionWidgetFactory, SheetContentService) {
        var ddo = {
            scope: {},
            templateUrl: 'app/editor/ui/question/question.html',
            retrict: 'E',
            link: function linkFunc(scope) {
                scope.widget = QuestionWidgetFactory.create(SheetContentService.lastLoadedQuestion);
            }
        };

        return ddo;
    }

}());
