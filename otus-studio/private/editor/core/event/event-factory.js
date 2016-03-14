(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('EventFactory', EventFactory);

    EventFactory.$inject = [
        'EventTypeFactory',
        'AddDataEventFactory',
        'RemoveDataEventFactory',
        'SelectDataEventFactory',
        'UpdateDataEventFactory',
        'TouchDataEventFactory',
        'UntouchDataEventFactory'
    ];

    function EventFactory(EventTypeFactory, AddDataEventFactory, RemoveDataEventFactory, SelectDataEventFactory, UpdateDataEventFactory, TouchDataEventFactory,
        UntouchDataEventFactory) {

        var self = this,

            factories = {
                'ADD_DATA': AddDataEventFactory,
                'REMOVE_DATA': RemoveDataEventFactory,
                'SELECT_DATA': SelectDataEventFactory,
                'UPDATE_DATA': UpdateDataEventFactory,
                'TOUCH_DATA': TouchDataEventFactory,
                'UNTOUCH_DATA': UntouchDataEventFactory
            };

        /* Public interface */
        self.create = create;

        function create(editingSource, newState, listener) {
            var eventType = EventTypeFactory.create(editingSource.type, listener),
                eventPrototype = new Event(editingSource, newState, eventType);

            return factories[eventType.type].create(eventPrototype);
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

        Object.defineProperty(this, 'id', {
            value: editingSource.id,
            writable: false
        });
    }

}());
