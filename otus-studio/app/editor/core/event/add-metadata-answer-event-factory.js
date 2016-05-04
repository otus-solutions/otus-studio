(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('AddMetadataAnswerEventFactory', AddMetadataAnswerEventFactory);

    AddMetadataAnswerEventFactory.$inject = [
        'AddMetadataAnswerService',
        'WorkspaceService',
        'MetadataOptionWidgetFactory'
    ];

    function AddMetadataAnswerEventFactory(AddMetadataAnswerService, WorkspaceService, MetadataOptionWidgetFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new AddMetadataAnswerEvent(AddMetadataAnswerService, WorkspaceService, MetadataOptionWidgetFactory);
        }

        return self;
    }

    function AddMetadataAnswerEvent(AddMetadataAnswerService, WorkspaceService, MetadataOptionWidgetFactory) {
        var self = this;

        self.execute = execute;

        function execute(eventSource) {
            var option = AddMetadataAnswerService.execute(eventSource.question);
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
            return option;
        }
    }

}());
