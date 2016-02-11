(function() {

    angular
        .module('editor.engine.core')
        .service('ButtonTriggerService', ButtonTriggerService);

    ButtonTriggerService.$inject = ['EditingEventService'];

    function ButtonTriggerService(EditingEventService) {
        var self = this,
            sourceComponentType = 'add-button';

        /* Public interface */
        self.getTrigger = getTrigger;
        self.getSourceComponentType = getSourceComponentType;

        function getTrigger(editingSource) {
            return new ButtonTrigger(EditingEventService, editingSource);
        }

        function getSourceComponentType() {
            return sourceComponentType;
        }
    }

    function ButtonTrigger(EditingEventService, editingSource) {
        var self = this;

        self.name = 'ButtonTrigger';
        self.tree = 'html';
        self.sourceComponentType = 'add-button';
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
