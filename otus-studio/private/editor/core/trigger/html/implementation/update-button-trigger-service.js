(function() {
    'use strict';

    angular
        .module('editor.core')
        .service('UpdateButtonTriggerService', UpdateButtonTriggerService);

    UpdateButtonTriggerService.$inject = ['EventService'];

    function UpdateButtonTriggerService(EventService) {
        var self = this,
            sourceComponentType = 'update-button';

        /* Public interface */
        self.getTrigger = getTrigger;
        self.getSourceComponentType = getSourceComponentType;

        function getTrigger(editingSource) {
            return new UpdateButtonTrigger(EventService, editingSource);
        }

        function getSourceComponentType() {
            return sourceComponentType;
        }
    }

    function UpdateButtonTrigger(EventService, editingSource) {
        var self = this;

        self.name = 'RemoveButtonTrigger';
        self.tree = 'html';
        self.sourceComponentType = 'update-button';
        self.editingSource = editingSource;

        watchDomComponent();

        function watchDomComponent() {
            var jqElement = angular.element(self.editingSource.component);

            jqElement.on('click', function setClickTrigger() {
                EventService.performEvent(self.editingSource);
            });
        }
    }

}());
