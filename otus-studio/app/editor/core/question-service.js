(function() {
    'use strict';

    angular
        .module('editor.core')
        .service('QuestionService', QuestionService);

    QuestionService.$inject = [
        '$rootScope',
        'WorkspaceService',
        'WidgetService',
        'SheetContentService',
        'AddQuestionService'
    ];

    function QuestionService($rootScope, WorkspaceService, WidgetService, SheetContentService, AddQuestionService) {
        var self = this;

        self.addQuestion = addQuestion;

        function addQuestion(questionType) {
            var question = AddQuestionService.execute(questionType);

            SheetContentService.loadQuestion(question);

            $rootScope.$broadcast('questionPallete.question.add', question);

            WorkspaceService.workspace.currentQuestion = question;
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());
