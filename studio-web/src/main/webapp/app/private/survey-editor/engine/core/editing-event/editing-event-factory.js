(function() {
    'use strict';

    angular
        .module('editor.engine.core')
        .factory('EditingEventFactory', EditingEventFactory);

    EditingEventFactory.$inject = ['EditingEventTypeFactory'];

    function EditingEventFactory(EditingEventTypeFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        /*
         * Creates a simple EditingEvent instance
         */
        function create(editingSource, newState) {
            var eventType = EditingEventTypeFactory.get(editingSource.type);
            return new EditingEvent(editingSource, newState, eventType);
        }

        return this;
    }

    function EditingEvent(editingSource, state, eventType) {

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
