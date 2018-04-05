(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('UpdateOptionItemEventFactory', UpdateOptionItemEventFactory);

    UpdateOptionItemEventFactory.$inject = [
        'WorkspaceService'
    ];

    function UpdateOptionItemEventFactory(WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new UpdateOptionItemEvent(WorkspaceService);
        }

        return self;
    }

    function UpdateOptionItemEvent(WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute() {
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());
