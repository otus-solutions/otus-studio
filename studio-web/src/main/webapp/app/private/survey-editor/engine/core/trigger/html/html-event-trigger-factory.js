(function() {

    angular
        .module('core')
        .factory('HtmlEventTriggerFactory', HtmlEventTriggerFactory);

    HtmlEventTriggerFactory.$inject = ['EventTriggerTreeRegister'];

    function HtmlEventTriggerFactory(EventTriggerTreeRegister) {

        var self = this;

        var hasType = null;

        /* Public interface */
        self.produce = produce;

        function produce(editingSource) {
            var componentName = identifyComponent(editingSource.component);
            var componentType = identifyType(editingSource.component);
            var eventTriggers = selectEventTriggers(editingSource);

            return eventTriggers;
        }

        function identifyComponent(element) {
            return element.localName;
        }

        function identifyType(element) {
            if (element.type) {
                hasType = true;
            } else {
                hasType = false;
            }

            return element.type;
        }

        function selectEventTriggers(editingSource) {
            var domComponent = editingSource.component;

            var eventTriggerTree = EventTriggerTreeRegister.getEventTriggerTree(EventTriggerTreeRegister.HTML);
            var triggerTypePath = domComponent.localName.concat('.').concat(domComponent.type);
            var triggerInitializer = eventTriggerTree.getTriggerInitializer(triggerTypePath);
            var initializedTriggers = triggerInitializer.run(domComponent, editingSource.target);

            return initializedTriggers;
        }

        return this;
    }

}());
