(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('AddOptionItemEventFactory', AddOptionItemEventFactory);

    AddOptionItemEventFactory.$inject = [
        'AddOptionItemService',
        'WorkspaceService'
    ];

    function AddOptionItemEventFactory(AddOptionItemService, WorkspaceService) {
        var self = this;

        self.create = create;

        function create() {
            return new AddOptionItemEvent(AddOptionItemService, WorkspaceService);
        }

        return self;
    }

    function AddOptionItemEvent(AddOptionItemService, WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(questionReference, optionName, optionValue) {
            var option = AddOptionItemService.execute(questionReference, optionName, optionValue);
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
            return option;
        }
    }

}());
