(function() {
    'use strict';

    angular
        .module('editor.core')
        .service('PreInputTextTriggerService', PreInputTextTriggerService);

    PreInputTextTriggerService.$inject = ['EventService'];

    function PreInputTextTriggerService(EventService) {
        var self = this,
            sourceComponentType = 'pre-input-text';

        /* Public interface */
        self.getTrigger = getTrigger;
        self.getSourceComponentType = getSourceComponentType;

        function getTrigger(editingSource) {
            return new PreInputTextTrigger(EventService, editingSource);
        }

        function getSourceComponentType() {
            return sourceComponentType;
        }
    }

    function PreInputTextTrigger(EventService, editingSource) {
        var self = this;

        self.name = 'PreInputTextTrigger';
        self.tree = 'html';
        self.sourceComponentType = 'pre-input-text';
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
