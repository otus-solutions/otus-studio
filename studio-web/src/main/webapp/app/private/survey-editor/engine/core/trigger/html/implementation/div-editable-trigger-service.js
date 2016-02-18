(function() {

    angular
        .module('editor.engine.core')
        .service('DivEditableTriggerService', DivEditableTriggerService);

    DivEditableTriggerService.$inject = ['EditingEventService'];

    function DivEditableTriggerService(EditingEventService) {
        var self = this,
            sourceComponentType = 'div-editable';

        /* Public interface */
        self.getTrigger = getTrigger;
        self.getSourceComponentType = getSourceComponentType;

        function getTrigger(editingSource) {
            return new DivEditableTrigger(EditingEventService, editingSource);
        }

        function getSourceComponentType() {
            return sourceComponentType;
        }
    }

    function DivEditableTrigger(EditingEventService, editingSource) {
        var self = this;

        self.name = 'DivEditableTrigger';
        self.tree = 'html';
        self.sourceComponentType = 'div-editable';
        self.editingSource = editingSource;

        watchDomComponent();

        function watchDomComponent() {
            var jqElement = angular.element(self.editingSource.component);

            jqElement.on('focus', function setFocusTrigger() {
                EditingEventService.observeEvent(self.editingSource);
            });

            jqElement.on('blur', function setBlurTrigger() {
                EditingEventService.performEvent(self.editingSource);
            });
        }
    }

}());
