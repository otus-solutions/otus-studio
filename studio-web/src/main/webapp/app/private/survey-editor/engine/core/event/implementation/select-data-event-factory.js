(function() {

    angular
        .module('editor.engine.core')
        .factory('SelectDataEventFactory', SelectDataEventFactory);

    SelectDataEventFactory.$inject = ['MemoryUIService'];

    function SelectDataEventFactory(MemoryUIService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(prototype) {
            return new SelectDataEvent(prototype, MemoryUIService);
        }

        return self;
    }

    function SelectDataEvent(prototype, dispatcher) {
        var self = this;

        /* Public interface */
        self.forward = forward;

        function forward() {
            dispatcher.prompt(prototype);
        }
    }

}());
