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
            editor.edit(prototype);

            relatedEvents.forEach(function(event){
                editor.edit(event);
            });

            WorkspaceService.workspace.isdb.userEdits.storeUnique(prototype);
        }
    }
}());
