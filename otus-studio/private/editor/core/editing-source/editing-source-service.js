(function() {
    'use strict';

    angular
        .module('editor.core')
        .service('EditingSourceService', EditingSourceService);

    EditingSourceService.$inject = ['EditingSourceFactory', 'TriggerFactory'];

    function EditingSourceService(EditingSourceFactory, TriggerFactory) {

        var self = this;

        /* Public interface */
        self.createEditingSource = createEditingSource;
        self.appendTriggersTo = appendTriggersTo;

        function createEditingSource(domComponent, attrs) {
            return EditingSourceFactory.produceEditingSource(domComponent, attrs.esType, attrs.esId, attrs.esModel, attrs.esTarget);
        }

        function appendTriggersTo(editingSource) {
            editingSource.activeTrigger = TriggerFactory.produceTrigger(editingSource);
        }

    }

}());
