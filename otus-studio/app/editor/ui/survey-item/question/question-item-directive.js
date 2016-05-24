(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusQuestionItem', directive);

    directive.$inject = [
        'SurveyItemWidgetFactory',
        'SheetContentService'
    ];

    function directive(SurveyItemWidgetFactory, SheetContentService) {
        var ddo = {
            scope: {},
            templateUrl: 'app/editor/ui/survey-item/question/question.html',
            retrict: 'E',
            link: function linkFunc(scope) {
                scope.widget = SurveyItemWidgetFactory.create(SheetContentService.lastLoadedQuestion);
            }
        };

        return ddo;
    }

}());
