(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('UpdateQuestionEventFactory', UpdateQuestionEventFactory);

    UpdateQuestionEventFactory.$inject = [
        'UpdateQuestionService',
        'SheetContentService',
        'WorkspaceService'
    ];

    function UpdateQuestionEventFactory(UpdateQuestionService, SheetContentService, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new UpdateQuestionEvent(UpdateQuestionService, SheetContentService, WorkspaceService);
        }

        return self;
    }

    function UpdateQuestionEvent(UpdateQuestionService, SheetContentService, WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(data) {
            var question = UpdateQuestionService.execute(data);
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());
