(function() {

    angular
        .module('editor.engine.core')
        .service('EditingEventService', EditingEventService);

    EditingEventService.$inject = ['EditingEventFactory', 'EditingStateFactory', 'SurveyEditorService'];

    function EditingEventService(EditingEventFactory, EditingStateFactory, SurveyEditorService) {
        var self = this;

        /* Public interface */
        self.observeEditing = observeEditing;
        self.performEditing = performEditing;

        function observeEditing(editingSource) {
            editingState = EditingStateFactory.create(editingSource);
        }

        function performEditing(editingSource) {
            var editingState = EditingStateFactory.create(editingSource),
                editingEvent = EditingEventFactory.create(editingSource, editingState);
            
            SurveyEditorService.editData(editingEvent);
        }
    }

}());
