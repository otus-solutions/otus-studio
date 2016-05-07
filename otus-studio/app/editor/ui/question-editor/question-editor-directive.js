(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusQuestionEditor', otusQuestionEditor);

    otusQuestionEditor.$inject = [
        'QuestionEditorWidgetFactory',
        'SheetContentService'
    ];

    function otusQuestionEditor(QuestionEditorWidgetFactory, SheetContentService) {
        var ddo = {
            scope: {},
            templateUrl: 'app/editor/ui/question-editor/question-editor.html',
            retrict: 'E',
            link: function linkFunc(scope, element, attrs) {
                scope.widget = QuestionEditorWidgetFactory.create(SheetContentService.lastLoadedQuestion, element);
            }
        };

        return ddo;
    }

}());
