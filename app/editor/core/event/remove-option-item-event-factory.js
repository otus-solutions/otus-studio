(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('RemoveOptionItemEventFactory', RemoveOptionItemEventFactory);

    RemoveOptionItemEventFactory.$inject = [
        'RemoveOptionItemService',
        'WorkspaceService'
    ];

    function RemoveOptionItemEventFactory(RemoveOptionItemService, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new RemoveOptionItemEvent(RemoveOptionItemService, WorkspaceService);
        }

        return self;
    }

    function RemoveOptionItemEvent(RemoveOptionItemService, WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(questionSource, optionName) {
            RemoveOptionItemService.execute(questionSource.getItem(), optionName);
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());
