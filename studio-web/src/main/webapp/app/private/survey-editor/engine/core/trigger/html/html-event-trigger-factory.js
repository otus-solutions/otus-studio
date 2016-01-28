(function() {

    angular
        .module('core')
        .factory('HtmlEventTriggerFactory', [
            'EventTriggerRegister',
            'InputTextEventTrigger',
            'ButtonEventTrigger',
            HtmlEventTriggerFactory
        ]);

    function HtmlEventTriggerFactory(EventTriggerRegister, InputTextEventTrigger, ButtonEventTrigger) {
        var factory = {
            identifyComponent: function(element) {
                return element.localName;
            },
            identifyType: function(element) {
                return element.type;
            },
            selectEventTrigger: function(component, type, data, ngModel) {
                var tree = EventTriggerRegister.getEventTriggerTree('html'),
                    eventTrigger;

                if (type)
                    eventTrigger = tree[component][type];
                else
                    eventTrigger = tree[component];

                return eventTrigger;
            },
            produce: function produce(element, ngModel) {
                var component = this.identifyComponent(element[0]),
                    type = this.identifyType(element[0]),
                    eventTrigger = this.selectEventTrigger(component, type, element, ngModel);

                eventTrigger.init(element, ngModel);
            }
        };

        return factory;
    }

}());
