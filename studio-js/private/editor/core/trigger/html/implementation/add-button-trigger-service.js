(function() {
    'use strict';

    angular
        .module('editor.core')
        .service('AddButtonTriggerService', AddButtonTriggerService);

    AddButtonTriggerService.$inject = ['EventService'];

    function AddButtonTriggerService(EventService) {
        var self = this,
            sourceComponentType = 'add-button';

        /* Public interface */
        self.getTrigger = getTrigger;
        self.getSourceComponentType = getSourceComponentType;

        function getTrigger(editingSource) {
            return new AddButtonTrigger(EventService, editingSource);
        }

        function getSourceComponentType() {
            return sourceComponentType;
        }
    }

    function AddButtonTrigger(EventService, editingSource) {
        var self = this;

        self.name = 'AddButtonTrigger';
        self.tree = 'html';
        self.sourceComponentType = 'add-button';
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
