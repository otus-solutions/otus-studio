(function() {

    angular
        .module('editor.engine.core')
        .service('AddButtonTriggerService', AddButtonTriggerService);

    AddButtonTriggerService.$inject = ['EditingEventService'];

    function AddButtonTriggerService(EditingEventService) {
        var self = this,
            sourceComponentType = 'add-button';

        /* Public interface */
        self.getTrigger = getTrigger;
        self.getSourceComponentType = getSourceComponentType;

        function getTrigger(editingSource) {
            return new AddButtonTrigger(EditingEventService, editingSource);
        }

        function getSourceComponentType() {
            return sourceComponentType;
        }
    }

    function AddButtonTrigger(EditingEventService, editingSource) {
        var self = this;

        self.name = 'AddButtonTrigger';
        self.tree = 'html';
        self.sourceComponentType = 'add-button';
        self.editingSource = editingSource;

        watchDomComponent();

        function watchDomComponent() {
            var jqElement = angular.element(self.editingSource.component);

            jqElement.on('click', function setClickTrigger() {
                EditingEventService.performEvent(self.editingSource);
            });
        }
    }

}());
