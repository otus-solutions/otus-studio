(function() {

    angular
        .module('editor.engine.core')
        .factory('SetDataEventFactory', SetDataEventFactory);

    SetDataEventFactory.$inject = ['EditorEngineService', 'MemoryService'];

    function SetDataEventFactory(EditorEngineService, MemoryService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(prototype) {
            return new SetDataEvent(prototype, EditorEngineService, MemoryService);
        }

        return self;
    }

    function SetDataEvent(prototype, editor, memory) {
        var self = this;

        /* Public interface */
        self.forward = forward;

        function forward() {
            editor.editData(prototype);
            memory.storeData(prototype);
        }
    }

}());
