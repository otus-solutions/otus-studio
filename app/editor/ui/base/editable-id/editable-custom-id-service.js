(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('EditableCustomIDService', EditableCustomIDService);

    EditableCustomIDService.$inject = [
        'WorkspaceService',
        'UpdateQuestionEventFactory',
        '$mdToast'
    ];

    function EditableCustomIDService(WorkspaceService, UpdateQuestionEventFactory, $mdToast) {
        var self = this;

        self.isEmpty = isEmpty;
        self.removeAllBlankSpaces = removeAllBlankSpaces;
        self.restoreScreenID = restoreScreenID;
        self.hasChanges = hasChanges;
        self.execute = execute;

        function isEmpty(customizedID) {
            return customizedID === '';
        }

        function removeAllBlankSpaces(customizedID) {
            return customizedID.replace(/\s/g, '');
        }

        function restoreScreenID(event, editableID_Object) {
            event.target.innerText = editableID_Object.getCustomizedID();
        }

        function hasChanges(customizedID, editableID_Object) {
            return customizedID !== editableID_Object.getCustomizedID();
        }

        function execute(event, editableID_Object) {
            var customizedID = removeAllBlankSpaces(event.target.innerText);

            if (customizedID === editableID_Object.getCustomizedID() || isEmpty(customizedID)) {
                restoreScreenID(event, editableID_Object);
            } else {
                if (hasChanges(customizedID, editableID_Object)) {
                    if (_checkIfIsAvailable(customizedID)) {
                        editableID_Object.updateCustomizedID(customizedID);
                        UpdateQuestionEventFactory.create().execute(self);
                        restoreScreenID(event, editableID_Object);
                    } else {
                        $mdToast.show($mdToast.simple().textContent('O ID inserido já está em uso.'));
                        restoreScreenID(event, editableID_Object);
                    }
                }
            }
        }

        function _checkIfIsAvailable(customizedID) {
            return WorkspaceService.getSurvey().isAvailableCustomID(customizedID) ? true : false;
        }
    }

}());
