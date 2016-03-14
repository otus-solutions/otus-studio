(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('UpdateDataEventFactory', UpdateDataEventFactory);

    UpdateDataEventFactory.$inject = ['EditorEngineService', 'WorkspaceService'];

    function UpdateDataEventFactory(EditorEngineService, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(prototype) {
            return new UpdateDataEvent(prototype, EditorEngineService, WorkspaceService);
        }

        return self;
    }

    function UpdateDataEvent(prototype, editor, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.forward = forward;

        function forward() {
            editor.edit(prototype);
            WorkspaceService.workspace.isdb.userEdits.store(prototype);
        }
    }

}());
