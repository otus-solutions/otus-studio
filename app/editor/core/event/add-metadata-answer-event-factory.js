(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('AddMetadataAnswerEventFactory', AddMetadataAnswerEventFactory);

    AddMetadataAnswerEventFactory.$inject = [
        'AddMetadataAnswerService',
        'WorkspaceService'
    ];

    function AddMetadataAnswerEventFactory(AddMetadataAnswerService, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new AddMetadataAnswerEvent(AddMetadataAnswerService, WorkspaceService);
        }

        return self;
    }

    function AddMetadataAnswerEvent(AddMetadataAnswerService, WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(eventSource) {
          console.log(eventSource);          
            var option = AddMetadataAnswerService.execute(eventSource.getItem());
            console.log(self);
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
            return option;
        }
    }

}());
