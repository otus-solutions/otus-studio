(function() {
    'use strict';

    angular
        .module('editor.core')
        .service('EventService', EventService);

    EventService.$inject = [
        'EventFactory',
        'StateFactory',
        'EditorEngineService'
    ];

    function EventService(EventFactory, StateFactory, EditorEngineService) {
        var self = this;

        /* Public interface */
        self.performEvent = performEvent;

        function performEvent(editingSource, listener) {
            var state = StateFactory.create(editingSource),
                event = EventFactory.create(editingSource, state, listener);

            event.forward();
        }
    }

}());
