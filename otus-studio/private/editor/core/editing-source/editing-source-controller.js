(function() {
    'use strict';

    angular
        .module('editor.core')
        .controller('EditingSourceController', EditingSourceController);

    EditingSourceController.$inject = [
        '$scope',
        '$element',
        '$attrs',
        'EditingSourceService'
    ];

    function EditingSourceController($scope, $element, $attrs, EditingSourceService) {
        var self = this,
            editingSource = null;

        /* Public interface */
        self.catchEditingSourceComponent = catchEditingSourceComponent;
        self.attachTriggers = attachTriggers;

        function catchEditingSourceComponent() {
            editingSource = EditingSourceService.createEditingSource($element, $attrs);
        }

        function attachTriggers() {
            EditingSourceService.appendTriggersTo(editingSource);
        }
    }

}());
