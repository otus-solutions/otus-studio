(function() {

    angular
        .module('editor.engine.core')
        .service('EditingEventService', EditingEventService);

    EditingEventService.$inject = ['EditingEventFactory', 'InputTextParser'];

    function EditingEventService(EditingEventFactory, InputTextParser) {
        var self = this;

        /* Public interface */
        self.observeEditing = observeEditing;
        self.performEditing = performEditing;

        function observeEditing(editingSource) {
            editingSource.parsedDom = InputTextParser.parse(editingSource.component);
            console.log(editingSource);
        }

        function performEditing(editingSource) {
            editingSource.parsedDom = InputTextParser.parse(editingSource.component);
            console.log(editingSource);
        }
    }

}());
