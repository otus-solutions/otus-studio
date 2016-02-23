(function() {
    'use strict';

    angular
        .module('editor.engine.core')
        .factory('RemoveDataEventFactory', RemoveDataEventFactory);

    RemoveDataEventFactory.$inject = ['EditorEngineService', 'MemoryService'];

    function RemoveDataEventFactory(EditorEngineService, MemoryService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(prototype) {
            return new RemoveDataEvent(prototype, EditorEngineService, MemoryService);
        }

        return self;
    }

    function RemoveDataEvent(prototype, editor, memory) {
        var self = this;

        /* Public interface */
        self.forward = forward;

        function forward() {
            editor.edit(prototype);
            memory.store(prototype);
        }
    }

}());
