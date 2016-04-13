(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('UntouchDataEventFactory', UntouchDataEventFactory);

    UntouchDataEventFactory.$inject = ['WorkspaceService'];

    function UntouchDataEventFactory(WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(prototype) {
            return new UntouchDataEvent(prototype, WorkspaceService);
        }

        return self;
    }

    function UntouchDataEvent(prototype, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.forward = forward;

        function forward() {
            // WorkspaceService.workspace.database.editordb.store(prototype);
        }
    }

}());
