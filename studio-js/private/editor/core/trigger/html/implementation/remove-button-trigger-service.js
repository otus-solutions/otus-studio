(function() {
    'use strict';

    angular
        .module('editor.core')
        .service('RemoveButtonTriggerService', RemoveButtonTriggerService);

    RemoveButtonTriggerService.$inject = ['EventService'];

    function RemoveButtonTriggerService(EventService) {
        var self = this,
            sourceComponentType = 'remove-button';

        /* Public interface */
        self.getTrigger = getTrigger;
        self.getSourceComponentType = getSourceComponentType;

        function getTrigger(editingSource) {
            return new RemoveButtonTrigger(EventService, editingSource);
        }

        function getSourceComponentType() {
            return sourceComponentType;
        }
    }

    function RemoveButtonTrigger(EventService, editingSource) {
        var self = this;

        self.name = 'RemoveButtonTrigger';
        self.tree = 'html';
        self.sourceComponentType = 'remove-button';
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
