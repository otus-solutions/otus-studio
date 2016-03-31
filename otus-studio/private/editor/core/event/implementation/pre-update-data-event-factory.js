(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('PreUpdateDataEventFactory', PreUpdateDataEventFactory);

    PreUpdateDataEventFactory.$inject = ['EditorEngineService', 'WorkspaceService'];

    function PreUpdateDataEventFactory(EditorEngineService, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(prototype) {
            return new PreUpdateDataEvent(prototype, EditorEngineService, WorkspaceService);
        }

        return self;
    }

    function PreUpdateDataEvent(prototype, editor, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.forward = forward;

        function forward() {
            WorkspaceService.workspace.isdb.userEdits.storeUnique(prototype);
        }
    }

}());
