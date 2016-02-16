(function() {

    angular
        .module('editor.engine.core')
        .service('RemoveButtonTriggerService', RemoveButtonTriggerService);

    RemoveButtonTriggerService.$inject = ['EditingEventService'];

    function RemoveButtonTriggerService(EditingEventService) {
        var self = this,
            sourceComponentType = 'remove-button';

        /* Public interface */
        self.getTrigger = getTrigger;
        self.getSourceComponentType = getSourceComponentType;

        function getTrigger(editingSource) {
            return new RemoveButtonTrigger(EditingEventService, editingSource);
        }

        function getSourceComponentType() {
            return sourceComponentType;
        }
    }

    function RemoveButtonTrigger(EditingEventService, editingSource) {
        var self = this;

        self.name = 'RemoveButtonTrigger';
        self.tree = 'html';
        self.sourceComponentType = 'remove-button';
        self.editingSource = editingSource;

        watchDomComponent();

        function watchDomComponent() {
            var jqElement = angular.element(self.editingSource.component);

            jqElement.on('click', function setOnFocus() {
                EditingEventService.performEditing(self.editingSource);
            });
        }
    }

}());
