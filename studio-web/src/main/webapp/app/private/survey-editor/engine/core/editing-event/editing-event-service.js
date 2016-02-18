(function() {

    angular
        .module('editor.engine.core')
        .service('EditingEventService', EditingEventService);

    EditingEventService.$inject = ['EditingEventFactory', 'EditingStateFactory', 'EditorEngineService'];

    function EditingEventService(EditingEventFactory, EditingStateFactory, EditorEngineService) {
        var self = this;

        /* Public interface */
        self.observeEvent = observeEvent;
        self.performEvent = performEvent;

        function observeEvent(editingSource) {
            editingState = EditingStateFactory.create(editingSource);
        }

        function performEvent(editingSource) {
            var editingState = EditingStateFactory.create(editingSource),
                editingEvent = EditingEventFactory.create(editingSource, editingState);

            EditorEngineService.editData(editingEvent);
        }
    }

}());
