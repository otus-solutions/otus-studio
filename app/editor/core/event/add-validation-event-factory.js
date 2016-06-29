(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('AddValidationEventFactory', AddValidationEventFactory);

    AddValidationEventFactory.$inject = [
        'AddValidationService',
        'WorkspaceService'
    ];

    function AddValidationEventFactory(AddValidationService, WorkspaceService){
        var self = this;

        self.create = create;

        function create() {
            return new AddValidationEvent(AddValidationService, WorkspaceService);
        }

        return self;
    }

    function AddValidationEvent(AddValidationService, WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(validationData) {
            var option = AddValidationService.execute(validationData.getItem());
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
            return option;
        }
    }
}());
