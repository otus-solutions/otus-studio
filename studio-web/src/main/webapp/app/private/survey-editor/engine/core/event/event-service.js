(function() {
    'use strict';

    angular
        .module('editor.engine.core')
        .service('EventService', EventService);

    EventService.$inject = [
        'EventFactory',
        'StateFactory',
        'EditorEngineService'
    ];

    function EventService(EventFactory, StateFactory, EditorEngineService) {
        var self = this;

        /* Public interface */
        self.observeEvent = observeEvent;
        self.performEvent = performEvent;

        function observeEvent(editingSource) {
            var state = StateFactory.create(editingSource);
        }

        function performEvent(editingSource, listener) {
            var state = StateFactory.create(editingSource),
                event = EventFactory.create(editingSource, state, listener);

            event.forward();
        }
    }

}());
