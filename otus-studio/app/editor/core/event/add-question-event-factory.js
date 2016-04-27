(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('AddQuestionEventFactory', AddQuestionEventFactory);

    AddQuestionEventFactory.$inject = [
        'AddQuestionService',
        'SheetContentService',
        'WorkspaceService'
    ];

    function AddQuestionEventFactory(AddQuestionService, SheetContentService, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new AddQuestionEvent(AddQuestionService, SheetContentService, WorkspaceService);
        }

        return self;
    }

    function AddQuestionEvent(AddQuestionService, SheetContentService, WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(data) {
            var question = AddQuestionService.execute(data);
            SheetContentService.loadQuestion(question);

            WorkspaceService.workspace.currentQuestion = question;
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());
