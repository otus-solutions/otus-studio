(function() {

    angular
        .module('editor.engine.core')
        .factory('AddDataEventFactory', AddDataEventFactory);

    AddDataEventFactory.$inject = ['EditorEngineService', 'MemoryService'];

    function AddDataEventFactory(EditorEngineService, MemoryService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(prototype) {
            return new AddDataEvent(prototype, EditorEngineService, MemoryService);
        }

        return self;
    }

    function AddDataEvent(prototype, editor, memory) {
        var self = this;

        /* Public interface */
        self.forward = forward;

        function forward() {
            editor.edit(prototype);
            memory.store(prototype);
        }
    }

}());
