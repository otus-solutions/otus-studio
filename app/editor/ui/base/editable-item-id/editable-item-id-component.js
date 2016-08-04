(function() {
    'use strict';

    angular
        .module('editor.ui')
        .component('editableItemId', {
            templateUrl: 'app/editor/ui/base/editable-item-id/editable-item-id.html',
            controller: EditableItemID,
            bindings: {
                item: '<'
            }
        });

    EditableItemID.$inject = [
        '$element',
        'UpdateQuestionEventFactory',
        'UpdateSurveyItemCustomID',
        'WorkspaceService'
    ];

    function EditableItemID($element, UpdateQuestionEventFactory, UpdateSurveyItemCustomID, WorkspaceService) {

        self = this;
        self.$onInit = onInit;

        var _item;
        var divContentEditable;

        function onInit() {
            _item = self.item;
            divContentEditable = $element.children()[0];
            divContentEditable.innerText = _item.customID;
        }

        $element.on('focusout', function() {
            var editedID = divContentEditable.innerText;
            if (isEmpty(editedID)) {
                editedID = restoreTemplateID(editedID);
            }
            if (hasChanges(editedID)) {
                updateCustomID(removeAllBlankSpaces(editedID));
            }
        });

        function removeAllBlankSpaces(editedID) {
            return editedID.replace(/\s/g, '');
        }

        function isEmpty(editedID) {
            return removeAllBlankSpaces(editedID) === '';
        }

        function restoreTemplateID(editedID) {
            divContentEditable.innerText = _item.templateID;
            editedID = _item.templateID;
            return editedID;
        }

        function hasChanges(editedID) {
            return (editedID !== _item.customID);
        }

        function updateCustomID(editedID) {
            divContentEditable.innerText = editedID;
            if (WorkspaceService.getSurvey().isAvailableID(editedID)) {
                UpdateSurveyItemCustomID.execute(_item, editedID);
                UpdateQuestionEventFactory.create().execute(self);
            } else {
                alert('O ID inserido já está em uso!');
                restoreTemplateID(editedID);
                UpdateQuestionEventFactory.create().execute(self);
                return;
            }
        }
    }

})();
