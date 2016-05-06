(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('AddQuestionEventFactory', AddQuestionEventFactory);

    AddQuestionEventFactory.$inject = [
        'AddQuestionService',
        'SheetContentService',
        'WorkspaceService',
        'WidgetService'
    ];

    function AddQuestionEventFactory(AddQuestionService, SheetContentService, WorkspaceService, WidgetService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new AddQuestionEvent(AddQuestionService, SheetContentService, WorkspaceService, WidgetService);
        }

        return self;
    }

    function AddQuestionEvent(AddQuestionService, SheetContentService, WorkspaceService, WidgetService) {
        var self = this;

        self.execute = execute;

        function execute(questionType) {
            var question = AddQuestionService.execute(questionType);
            SheetContentService.loadQuestion(question);

            WorkspaceService.workspace.currentQuestion = question;
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());
