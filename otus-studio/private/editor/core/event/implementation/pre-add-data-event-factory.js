(function() {
    'use strict';

    angular
    .module('editor.core')
    .factory('PreAddDataEventFactory', PreAddDataEventFactory);

    PreAddDataEventFactory.$inject = ['EditorEngineService', 'WorkspaceService'];

    function PreAddDataEventFactory(EditorEngineService, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(prototype) {
            return new PreAddDataEvent(prototype, EditorEngineService, WorkspaceService);
        }

        return self;
    }

    function PreAddDataEvent(prototype, editor, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.forward = forward;

        function forward() {
            var relatedEvents = WorkspaceService.workspace.isdb.userEdits.fetchEventBy('source.processor', prototype.id);
            EditorEngineService.edit(prototype);

            relatedEvents.forEach(function(event){
                EditorEngineService.edit(event);
            });
        }
    }
}());
