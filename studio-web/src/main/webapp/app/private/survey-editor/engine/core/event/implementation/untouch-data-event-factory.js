(function() {

    angular
        .module('editor.engine.core')
        .factory('UntouchDataEventFactory', UntouchDataEventFactory);

    UntouchDataEventFactory.$inject = ['MemoryUIService'];

    function UntouchDataEventFactory(MemoryUIService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(prototype) {
            return new UntouchDataEvent(prototype, MemoryUIService);
        }

        return self;
    }

    function UntouchDataEvent(prototype, dispatcher) {
        var self = this;

        /* Public interface */
        self.forward = forward;

        function forward() {
            dispatcher.prompt(prototype);
        }
    }

}());
