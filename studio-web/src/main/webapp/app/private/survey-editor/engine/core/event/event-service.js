(function() {

    angular
        .module('editor.engine.core')
        .service('EventService', EventService);

    EventService.$inject = [
        'EventFactory',
        'StateFactory',
        'EditorEngineService',
        'MemoryUIService'
    ];

    function EventService(EventFactory, StateFactory, EditorEngineService, MemoryUIService) {
        var self = this;

        /* Public interface */
        self.observeEvent = observeEvent;
        self.performEvent = performEvent;

        function observeEvent(editingSource) {
            editingState = StateFactory.create(editingSource);
        }

        function performEvent(editingSource, listener) {
            var editingState = StateFactory.create(editingSource),
                event = EventFactory.create(editingSource, editingState, listener);

            event.forward();
        }
    }

}());
