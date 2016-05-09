(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('AddPageItemEventFactory', AddPageItemEventFactory);

    AddPageItemEventFactory.$inject = [
        'AddPageItemService',
        'SheetContentService',
        'WorkspaceService',
        'WidgetService'
    ];

    function AddPageItemEventFactory(AddPageItemService, SheetContentService, WorkspaceService, WidgetService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new AddPageItemEvent(AddPageItemService, SheetContentService, WorkspaceService, WidgetService);
        }

        return self;
    }

    function AddPageItemEvent(AddPageItemService, SheetContentService, WorkspaceService, WidgetService) {
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
