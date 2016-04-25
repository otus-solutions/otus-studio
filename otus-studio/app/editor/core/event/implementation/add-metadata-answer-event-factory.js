(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('AddMetadataAnswerEventFactory', AddMetadataAnswerEventFactory);

    AddMetadataAnswerEventFactory.$inject = [
        'AddMetadataAnswerService',
        'MetadataAnswerOptionContentService',
        'WorkspaceService'
    ];

    function AddMetadataAnswerEventFactory(AddMetadataAnswerService, MetadataAnswerOptionContentService, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new AddMetadataAnswerEvent(AddMetadataAnswerService, MetadataAnswerOptionContentService, WorkspaceService);
        }

        return self;
    }

    function AddMetadataAnswerEvent(AddMetadataAnswerService, MetadataAnswerOptionContentService, WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(data) {
            var metadata = AddMetadataAnswerService.execute(data);
            MetadataAnswerOptionContentService.loadOption(metadata);
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());
