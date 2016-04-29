(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('AddPageItemEventFactory', AddPageItemEventFactory);

    AddPageItemEventFactory.$inject = [
        'AddPageItemService',
        'SheetContentService',
        'WorkspaceService'
    ];

    function AddPageItemEventFactory(AddPageItemService, SheetContentService, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new AddPageItemEvent(AddPageItemService, SheetContentService, WorkspaceService);
        }

        return self;
    }

    function AddPageItemEvent(AddPageItemService, SheetContentService, WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(data) {
            var item = AddPageItemService.execute(data);
            SheetContentService.loadItem(item);

            WorkspaceService.workspace.currentQuestion = data;
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());
