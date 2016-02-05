(function() {

    angular
        .module('core')
        .service('InputTextTriggerService', InputTextTriggerService);

    InputTextTriggerService.$inject = ['EditingEventService'];

    function InputTextTriggerService(EditingEventService) {
        var self = this,
            sourceComponentType = 'input-text';

        /* Public interface */
        self.getTrigger = getTrigger;
        self.getSourceComponentType = getSourceComponentType;

        function getTrigger(editingSource) {
            return new InputTextTrigger(EditingEventService, editingSource);
        }

        function getSourceComponentType() {
            return sourceComponentType;
        }
    }

    function InputTextTrigger(EditingEventService, editingSource) {
        var self = this;

        self.name = 'InputTextTrigger';
        self.tree = 'html';
        self.sourceComponentType = 'input-text';
        self.editingSource = editingSource;

        watchDomComponent();

        function watchDomComponent() {
            var jqElement = angular.element(self.editingSource.component);

            jqElement.on('focus', function setOnFocus() {
                EditingEventService.observeEditing(self.editingSource);
            });

            jqElement.on('blur', function setOnBlur() {
                EditingEventService.performEditing(self.editingSource);
            });
        }
    }

}());
