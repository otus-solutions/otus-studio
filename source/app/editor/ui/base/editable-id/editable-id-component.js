(function() {
    'use strict';

    angular
        .module('editor.ui')
        .component('editableId', {
            templateUrl: 'app/editor/ui/base/editable-id/editable-id.html',
            controller: EditableID,
            bindings: {
                item: '<'
            }
        });

    EditableID.$inject = [
        '$element',
        'EditableIDFactory',
        'EditableCustomIDService'
    ];

    function EditableID($element, EditableIDFactory, EditableCustomIDService) {
        self = this;
        var _editableID;

        self.$onInit = onInit;

        function onInit() {
            _editableID = EditableIDFactory.create(self.item);
            $element.children()[0].innerText = _editableID.getCustomizedID();
        }

        $element.on('focusout', function(event) {
            EditableCustomIDService.execute(event, _editableID);
        });

    }

})();
