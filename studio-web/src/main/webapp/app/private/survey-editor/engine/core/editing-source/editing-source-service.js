(function() {

    angular
        .module('core')
        .service('EditingSourceService', EditingSourceService);

    EditingSourceService.$inject = ['EditingSourceFactory', 'TriggerFactory'];

    function EditingSourceService(EditingSourceFactory, TriggerFactory) {

        var self = this;

        /* Public interface */
        self.createEditingSource = createEditingSource;
        self.appendTriggersTo = appendTriggersTo;

        function createEditingSource(domComponent, attrs) {
            return EditingSourceFactory.produceEditingSource(domComponent, attrs.esId, attrs.esType, attrs.esTarget);
        }

        function appendTriggersTo(editingSource) {
            editingSource.activeTriggers = TriggerFactory.produceTriggers(editingSource);
        }

    }

}());
