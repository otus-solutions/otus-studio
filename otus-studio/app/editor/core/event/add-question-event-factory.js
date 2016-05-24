(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('AddQuestionEventFactory', AddQuestionEventFactory);

    AddQuestionEventFactory.$inject = [
        '$rootScope',
        'WorkspaceService',
        'WidgetService',
        'SheetContentService',
        'AddQuestionService'
    ];

    function AddQuestionEventFactory($rootScope, WorkspaceService, WidgetService, SheetContentService, AddQuestionService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new AddQuestionEvent($rootScope, WorkspaceService, WidgetService, SheetContentService, AddQuestionService);
        }

        return self;
    }

    function AddQuestionEvent($rootScope, WorkspaceService, WidgetService, SheetContentService, AddQuestionService) {
        var self = this;

        self.execute = execute;

        function execute(questionType) {
            var question = AddQuestionService.execute(questionType);
            SheetContentService.loadQuestion(question);
            $rootScope.$broadcast('question.add', question);
            WorkspaceService.workspace.currentQuestion = question;
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());
