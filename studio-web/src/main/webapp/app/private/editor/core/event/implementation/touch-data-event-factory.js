(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('TouchDataEventFactory', TouchDataEventFactory);

    TouchDataEventFactory.$inject = ['WorkspaceService'];

    function TouchDataEventFactory(WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(prototype) {
            return new TouchDataEvent(prototype, WorkspaceService);
        }

        return self;
    }

    function TouchDataEvent(prototype, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.forward = forward;

        function forward() {
            // WorkspaceService.workspace.database.editordb.store(prototype);
        }
    }

}());
