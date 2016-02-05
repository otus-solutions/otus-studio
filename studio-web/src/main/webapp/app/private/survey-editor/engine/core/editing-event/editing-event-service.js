(function() {

    angular
        .module('editor.engine.core')
        .service('EditingEventService', EditingEventService);

    EditingEventService.$inject = ['EditingEventFactory'];

    function EditingEventService(EditingEventFactory) {
        var self = this;

        /* Public interface */
        self.observeEditing = observeEditing;
        self.performEditing = performEditing;

        function observeEditing(editingSource) {
            console.log(EditingEventFactory.createEditingEvent(editingSource));
            console.log(editingSource);
        }

        function performEditing(editingSource) {
            console.log(EditingEventFactory.createEditingEvent(editingSource));
            console.log(editingSource);
        }
    }

}());
