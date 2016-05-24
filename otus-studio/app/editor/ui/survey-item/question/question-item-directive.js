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
            link: function linkFunc(scope, element) {
                scope.widget = SurveyItemWidgetFactory.create(scope, element, SheetContentService.lastLoadedQuestion);
            }
        };

        return ddo;
    }

}());
