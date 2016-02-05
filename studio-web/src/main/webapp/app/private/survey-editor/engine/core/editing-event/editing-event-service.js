(function() {

    angular
        .module('editor.engine.core')
        .service('EditingEventService', EditingEventService);

    EditingEventService.$inject = ['EditingEventFactory', 'EditingStateFactory'];

    function EditingEventService(EditingEventFactory, EditingStateFactory) {
        var self = this;

        /* Public interface */
        self.observeEditing = observeEditing;
        self.performEditing = performEditing;

        function observeEditing(editingSource) {
            editingState = EditingStateFactory.create(editingSource);
            console.log(editingState);
        }

        function performEditing(editingSource) {
            editingState = EditingStateFactory.create(editingSource);
            console.log(editingState);
        }
    }

}());
