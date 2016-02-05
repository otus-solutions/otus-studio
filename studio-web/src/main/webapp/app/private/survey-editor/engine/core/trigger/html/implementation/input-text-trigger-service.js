(function() {

    angular
        .module('core')
        .service('InputTextTriggerService', InputTextTriggerService);

    InputTextTriggerService.$inject = ['EditingEventService'];

    function InputTextTriggerService(EditingEventService) {
        var self = this;
        self.trigger = new InputTextTrigger(EditingEventService);

        /* Public interface */
        self.getTrigger = getTrigger;

        function getTrigger() {
            return self.trigger;
        }
    }

    function InputTextTrigger(EditingEventService) {
        var self = this;

        self.name = 'InputTextTrigger';
        self.tree = 'html';
        self.sourceComponentType = 'input-text';
        self.editingSource = null;

        /* Public interface */
        self.watchDomComponent = watchDomComponent;

        function watchDomComponent(domComponent) {
            // var processor = new EventTriggerProcessorFactory(ngModel, 'update-model');

            var jqElement = angular.element(domComponent);

            jqElement.on('focus', function setOnFocus() {
                console.log('input on focus');
                EditingEventService.update(self.editingSource);
            });

            jqElement.on('blur', function setOnBlur() {
                console.log('input on blur');
                EditingEventService.update(self.editingSource);
            });
        }
    }

}());
