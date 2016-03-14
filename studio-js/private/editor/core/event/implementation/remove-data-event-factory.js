(function() {
    'use strict';

    angular
        .module('editor.core')
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
            WorkspaceService.workspace.isdb.userEdits.store(prototype);
        }
    }

}());
