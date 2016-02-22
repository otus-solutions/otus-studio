(function() {

    angular
        .module('editor.engine.core')
        .factory('SelectDataEventFactory', SelectDataEventFactory);

    SelectDataEventFactory.$inject = ['MemoryService'];

    function SelectDataEventFactory(MemoryService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(prototype) {
            return new SelectDataEvent(prototype, MemoryService);
        }

        return self;
    }

    function SelectDataEvent(prototype, dispatcher) {
        var self = this;

        /* Public interface */
        self.forward = forward;

        function forward() {
            dispatcher.storeData(prototype);
        }
    }

}());
