(function() {
    'use strict';

    angular
        .module('editor.ui')
        .component('editableItemId', {
            templateUrl: 'app/editor/ui/base/editable-item-id/editable-item-id.html',
            controller: EditableItemID,
            bindings: {
                templateId: '<'
            }
        });

    EditableItemID.$inject = [
        '$element'
    ];

    function EditableItemID($element) {
        self = this;
        self.$onInit = onInit;

        function onInit() {
            $element.children()[0].innerHTML = self.templateId;
        }

        $element.on('focusout', function(){
            self.templateId = $element.children()[0].innerHTML;
            onInit();
        });
    }

})();
