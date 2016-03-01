(function() {
    'use strict';

    angular
        .module('editor.core')
        .service('InputTextTriggerService', InputTextTriggerService);

    InputTextTriggerService.$inject = ['EventService'];

    function InputTextTriggerService(EventService) {
        var self = this,
            sourceComponentType = 'input-text';

        /* Public interface */
        self.getTrigger = getTrigger;
        self.getSourceComponentType = getSourceComponentType;

        function getTrigger(editingSource) {
            return new InputTextTrigger(EventService, editingSource);
        }

        function getSourceComponentType() {
            return sourceComponentType;
        }
    }

    function InputTextTrigger(EventService, editingSource) {
        var self = this;

        self.name = 'InputTextTrigger';
        self.tree = 'html';
        self.sourceComponentType = 'input-text';
        self.editingSource = editingSource;

        watchDomComponent();

        function watchDomComponent() {
            var jqElement = angular.element(self.editingSource.component);

            jqElement.on('blur', function setBlurTrigger() {
                EventService.performEvent(self.editingSource);
            });
        }
    }

}());
