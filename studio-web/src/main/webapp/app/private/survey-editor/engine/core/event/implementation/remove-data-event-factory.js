(function() {
    'use strict';

    angular
        .module('editor.engine.core')
        .factory('RemoveDataEventFactory', RemoveDataEventFactory);

    RemoveDataEventFactory.$inject = ['EditorEngineService', 'WorkspaceService'];

    function RemoveDataEventFactory(EditorEngineService, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(prototype) {
            return new RemoveDataEvent(prototype, EditorEngineService, WorkspaceService);
        }

        return self;
    }

    function RemoveDataEvent(prototype, editor, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.forward = forward;

        function forward() {
            editor.edit(prototype);
            WorkspaceService.workspace.database.editordb.store(prototype);
        }
    }

}());
