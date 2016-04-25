(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('RemoveMetadataOptionEventFactory', RemoveMetadataOptionEventFactory);

    RemoveMetadataOptionEventFactory.$inject = [
        'RemoveMetadataOptionService',
        'MetadataGroupContentService',
        'WorkspaceService'
    ];

    function RemoveMetadataOptionEventFactory(RemoveMetadataOptionService, MetadataGroupContentService, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new RemoveMetadataOptionEvent(RemoveMetadataOptionService, MetadataGroupContentService, WorkspaceService);
        }

        return self;
    }

    function RemoveMetadataOptionEvent(RemoveMetadataOptionService, MetadataGroupContentService, WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(data) {
            var metadata = RemoveMetadataOptionService.execute(data);
            MetadataGroupContentService.unloadOption();
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());
