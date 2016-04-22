(function() {
    'use strict';

    angular
        .module('editor.core')
        .service('EditingSourceService', EditingSourceService);

    EditingSourceService.$inject = [
        'EditingSourceFactory',
        'TriggerFactory',
        'WidgetService'
    ];

    function EditingSourceService(EditingSourceFactory, TriggerFactory, WidgetService) {

        var self = this;

        /* Public interface */
        self.createEditingSource = createEditingSource;
        self.appendTriggersTo = appendTriggersTo;

        function createEditingSource(component, attrs) {
            var editingSource;
            if (attrs)
                editingSource = EditingSourceFactory.produceEditingSource(component, attrs);
            else
                editingSource = EditingSourceFactory.create(component);

            return editingSource;
        }

        function appendTriggersTo(editingSource) {
            editingSource.activeTrigger = TriggerFactory.produceTrigger(editingSource);
        }
    }

}());
