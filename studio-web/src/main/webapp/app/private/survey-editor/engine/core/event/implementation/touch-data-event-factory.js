(function() {

    angular
        .module('editor.engine.core')
        .factory('TouchDataEventFactory', TouchDataEventFactory);

    TouchDataEventFactory.$inject = ['MemoryService'];

    function TouchDataEventFactory(MemoryService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(prototype) {
            return new TouchDataEvent(prototype, MemoryService);
        }

        return self;
    }

    function TouchDataEvent(prototype, dispatcher) {
        var self = this;

        /* Public interface */
        self.forward = forward;

        function forward() {
            dispatcher.storeData(prototype);
        }
    }

}());
