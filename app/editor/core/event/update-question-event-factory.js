(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('UpdateQuestionEventFactory', UpdateQuestionEventFactory);

    UpdateQuestionEventFactory.$inject = [
        'SheetContentService',
        'WorkspaceService'
    ];

    function UpdateQuestionEventFactory(SheetContentService, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new UpdateQuestionEvent(SheetContentService, WorkspaceService);
        }

        return self;
    }

    function UpdateQuestionEvent(SheetContentService, WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(data) {
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());
