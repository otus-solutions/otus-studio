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

        function execute(itemType) {
            var item = AddPageItemService.execute(itemType);
            SheetContentService.loadItem(item);

            WorkspaceService.workspace.currentQuestion = itemType;
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());
