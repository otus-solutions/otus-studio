(function() {

    angular
        .module('core')
        .service('ButtonEventTrigger', ['EventTriggerProcessor', 'EventTriggerRegister', ButtonEventTrigger]);

    function ButtonEventTrigger(EventTriggerProcessor, EventTriggerRegister) {
        var self = this;

        self.type = 'html';
        self.source = 'button.button';
        self.init = init;

        function init(element, ngModel) {
            var processor = new EventTriggerProcessor(element[0].attributes.action.nodeValue, 'action');

            element.on('click', function setOnFocus() {
                processor.storeNewState(element);
                processor.run();
            });
        }

        EventTriggerRegister.setEventTrigger(self);
    }

}());
