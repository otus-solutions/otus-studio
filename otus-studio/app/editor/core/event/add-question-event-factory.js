(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('AddQuestionEventFactory', AddQuestionEventFactory);

    AddQuestionEventFactory.$inject = [
        'AddQuestionService',
        'SheetContentService',
        'WorkspaceService',
        'WidgetService',
        '$rootScope'
    ];

    function AddQuestionEventFactory(AddQuestionService, SheetContentService, WorkspaceService, WidgetService, $rootScope) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new AddQuestionEvent(AddQuestionService, SheetContentService, WorkspaceService, WidgetService, $rootScope);
        }

        return self;
    }

    function AddQuestionEvent(AddQuestionService, SheetContentService, WorkspaceService, WidgetService, $rootScope) {
        var self = this;

        self.execute = execute;

        function execute(questionType) {
            var question = AddQuestionService.execute(questionType);

            SheetContentService.loadQuestion(question);

            $rootScope.$broadcast('questionPallete.question.add', question);

            WorkspaceService.workspace.currentQuestion = question;
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());
