(function() {

    angular
        .module('editor.engine.core')
        .factory('TouchDataEventFactory', TouchDataEventFactory);

    TouchDataEventFactory.$inject = ['MemoryUIService'];

    function TouchDataEventFactory(MemoryUIService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(prototype) {
            return new TouchDataEvent(prototype, MemoryUIService);
        }

        return self;
    }

    function TouchDataEvent(prototype, dispatcher) {
        var self = this;

        /* Public interface */
        self.forward = forward;

        function forward() {
            dispatcher.prompt(prototype);
        }
    }

}());
