(function() {

    angular
        .module('editor.engine.core')
        .factory('UntouchDataEventFactory', UntouchDataEventFactory);

    UntouchDataEventFactory.$inject = ['MemoryService'];

    function UntouchDataEventFactory(MemoryService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(prototype) {
            return new UntouchDataEvent(prototype, MemoryService);
        }

        return self;
    }

    function UntouchDataEvent(prototype, dispatcher) {
        var self = this;

        /* Public interface */
        self.forward = forward;

        function forward() {
            dispatcher.storeData(prototype);
        }
    }

}());
