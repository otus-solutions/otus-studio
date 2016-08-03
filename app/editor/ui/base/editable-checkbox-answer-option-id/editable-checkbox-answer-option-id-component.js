(function() {
    'use strict';

    angular
        .module('editor.ui')
        .component('editableCheckboxAnswerId', {
            templateUrl: 'app/editor/ui/base/editable-item-id/editable-item-id.html',
            controller: EditableCheckboxAnswerID,
            bindings: {
                option: '<'
            }
        });

    EditableCheckboxAnswerID.$inject = [
        '$element',
        'UpdateQuestionEventFactory',
    ];

    function EditableCheckboxAnswerID($element, UpdateQuestionEventFactory) {

        self = this;
        self.$onInit = onInit;

        var _option;
        var divContentEditable;

        function onInit() {
            _option = self.option;
            divContentEditable = $element.children()[0];
            divContentEditable.innerText = _option.customOptionID;
        }

        $element.on('focusout', function() {
            var editedID = divContentEditable.innerText;
            if (isEmpty(editedID)) {
                editedID = restoreTemplateID(editedID);
            }
            if (hasChanges(editedID)) {
                updateCustomOptionID(removeAllBlankSpaces(editedID));
            }
        });

        function removeAllBlankSpaces(editedID) {
            return editedID.replace(/\s/g, '');
        }

        function isEmpty(editedID) {
            return removeAllBlankSpaces(editedID) === '';
        }

        function restoreTemplateID(editedID) {
            divContentEditable.innerText = _option.optionID;
            editedID = _option.optionID;
            return editedID;
        }

        function hasChanges(editedID) {
            return editedID !== _option.customOptionID;
        }

        function updateCustomOptionID(editedID) {
            divContentEditable.innerText = editedID;
            _option.setCustomOptionID(editedID);
            UpdateQuestionEventFactory.create().execute(self);
        }
    }

})();
