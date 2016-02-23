(function() {
    'use strict';

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

    function TouchDataEvent(prototype, memory) {
        var self = this;

        /* Public interface */
        self.forward = forward;

        function forward() {
            memory.store(prototype);
        }
    }

}());
