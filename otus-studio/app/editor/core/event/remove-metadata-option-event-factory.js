(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('RemoveMetadataOptionEventFactory', RemoveMetadataOptionEventFactory);

    RemoveMetadataOptionEventFactory.$inject = [
        'RemoveMetadataOptionService',
        'WorkspaceService'
    ];

    function RemoveMetadataOptionEventFactory(RemoveMetadataOptionService, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new RemoveMetadataOptionEvent(RemoveMetadataOptionService, WorkspaceService);
        }

        return self;
    }

    function RemoveMetadataOptionEvent(RemoveMetadataOptionService, WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(eventSource) {
            RemoveMetadataOptionService.execute(eventSource.question);
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());
