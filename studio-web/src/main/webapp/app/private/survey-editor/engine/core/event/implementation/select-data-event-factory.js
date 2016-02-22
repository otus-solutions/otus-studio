(function() {

    angular
        .module('editor.engine.core')
        .factory('SelectDataEventFactory', SelectDataEventFactory);

    SelectDataEventFactory.$inject = ['UIMemoryService'];

    function SelectDataEventFactory(UIMemoryService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(prototype) {
            return new SelectDataEvent(prototype, UIMemoryService);
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
