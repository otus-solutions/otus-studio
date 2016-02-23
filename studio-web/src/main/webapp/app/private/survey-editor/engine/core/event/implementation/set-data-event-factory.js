(function() {
    'use strict';

    angular
        .module('editor.engine.core')
        .factory('SetDataEventFactory', SetDataEventFactory);

    SetDataEventFactory.$inject = ['EditorEngineService', 'WorkspaceService'];

    function SetDataEventFactory(EditorEngineService, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(prototype) {
            return new SetDataEvent(prototype, EditorEngineService, WorkspaceService);
        }

        return self;
    }

    function SetDataEvent(prototype, editor, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.forward = forward;

        function forward() {
            editor.edit(prototype);
            WorkspaceService.workspace.database.editordb.store(prototype);
        }
    }

}());
