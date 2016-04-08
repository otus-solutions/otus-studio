(function() {
    'use strict';

    angular
        .module('editor.core')
        .service('DivEditableTriggerService', DivEditableTriggerService);

    DivEditableTriggerService.$inject = ['EventService'];

    function DivEditableTriggerService(EventService) {
        var self = this,
            sourceComponentType = 'div-editable';

        /* Public interface */
        self.getTrigger = getTrigger;
        self.getSourceComponentType = getSourceComponentType;

        function getTrigger(editingSource) {
            return new DivEditableTrigger(EventService, editingSource);
        }

        function getSourceComponentType() {
            return sourceComponentType;
        }
    }

    function DivEditableTrigger(EventService, editingSource) {
        var self = this;

        self.name = 'DivEditableTrigger';
        self.tree = 'html';
        self.sourceComponentType = 'div-editable';
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
