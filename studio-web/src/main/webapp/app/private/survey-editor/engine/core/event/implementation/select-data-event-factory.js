(function() {
    'use strict';

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

    function SelectDataEvent(prototype, memory) {
        var self = this;

        /* Public interface */
        self.forward = forward;

        function forward() {
            memory.store(prototype);
        }
    }

}());
