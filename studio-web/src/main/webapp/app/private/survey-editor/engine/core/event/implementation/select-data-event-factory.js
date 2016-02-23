(function() {
    'use strict';

    angular
        .module('editor.engine.core')
        .factory('SelectDataEventFactory', SelectDataEventFactory);

    SelectDataEventFactory.$inject = ['WorkspaceService'];

    function SelectDataEventFactory(WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(prototype) {
            return new SelectDataEvent(prototype, WorkspaceService);
        }

        return self;
    }

    function SelectDataEvent(prototype, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.forward = forward;

        function forward() {
            WorkspaceService.workspace.database.editordb.store(prototype);
        }
    }

}());
