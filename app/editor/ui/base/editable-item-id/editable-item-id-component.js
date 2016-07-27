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
        'UpdateQuestionEventFactory'
    ];

    function EditableItemID($element, UpdateQuestionEventFactory) {
        self = this;
        self.$onInit = onInit;

        function onInit() {
            $element.children()[0].innerText = self.item.templateID;
            console.log(self.item.templateID);
        }

        $element.on('focusout', function(){
             var newID = $element.children()[0].innerText.trim();
             self.item.setCustomID(newID);
             self.item.templateID = newID;
             onInit();
             UpdateQuestionEventFactory.create().execute(self);
        });
    }

})();
