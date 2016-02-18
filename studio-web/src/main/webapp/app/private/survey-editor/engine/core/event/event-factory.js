(function() {
    'use strict';

    angular
        .module('editor.engine.core')
        .factory('EventFactory', EventFactory);

    EventFactory.$inject = ['EventTypeFactory'];

    function EventFactory(EventTypeFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        /*
         * Creates a simple EditingEvent instance
         */
        function create(editingSource, newState) {
            var eventType = EventTypeFactory.get(editingSource.type);
            return new Event(editingSource, newState, eventType);
        }

        return this;
    }

    function Event(editingSource, state, eventType) {

        Object.defineProperty(this, 'source', {
            value: editingSource,
            writable: false
        });

        Object.defineProperty(this, 'state', {
            value: state,
            writable: false
        });

        Object.defineProperty(this, 'target', {
            value: editingSource.target,
            writable: false
        });

        Object.defineProperty(this, 'type', {
            value: eventType,
            writable: false
        });

    }

}());
