(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('AddDataEventFactory', AddDataEventFactory);

    AddDataEventFactory.$inject = ['EditorEngineService', 'WorkspaceService'];

    function AddDataEventFactory(EditorEngineService, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(prototype) {
            return new AddDataEvent(prototype, EditorEngineService, WorkspaceService);
        }

        return self;
    }

    function AddDataEvent(prototype, editor, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.forward = forward;

        function forward() {
            editor.edit(prototype);
            WorkspaceService.workspace.isdb.userEdits.store(prototype);
        }
    }

}());
