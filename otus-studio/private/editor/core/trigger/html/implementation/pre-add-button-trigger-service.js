(function() {
    'use strict';

    angular
        .module('editor.core')
        .service('PreAddButtonTriggerService', PreAddButtonTriggerService);

    PreAddButtonTriggerService.$inject = ['EventService'];

    function PreAddButtonTriggerService(EventService) {
        var self = this,
            sourceComponentType = 'pre-add-button';

        /* Public interface */
        self.getTrigger = getTrigger;
        self.getSourceComponentType = getSourceComponentType;

        function getTrigger(editingSource) {
            return new PreAddButtonTrigger(EventService, editingSource);
        }

        function getSourceComponentType() {
            return sourceComponentType;
        }
    }

    function PreAddButtonTrigger(EventService, editingSource) {
        var self = this;

        self.name = 'PreAddButtonTrigger';
        self.tree = 'html';
        self.sourceComponentType = 'pre-add-button';
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
