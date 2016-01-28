(function() {

    angular
        .module('core')
        .service('InputTextEventTrigger', [
            'EventTriggerProcessor',
            'EventTriggerRegister',
            InputTextEventTrigger
        ]);

    function InputTextEventTrigger(EventTriggerProcessor, EventTriggerRegister) {
        var self = this;

        self.type = 'html';
        self.source = 'input.text';
        self.init = init;

        function init(element, ngModel) {
            var processor = new EventTriggerProcessor(ngModel, 'update-model');

            element.on('focus', function setOnFocus() {
                processor.storeOldState(element);
            });

            element.on('blur', function setOnBlur() {
                processor.storeNewState(element);
                processor.run();
            });
        }

        EventTriggerRegister.setEventTrigger(self);
    }

}());
