(function() {

    angular
        .module('core')
        .service('EventTriggerTreeRegister', EventTriggerTreeRegister);

    EventTriggerTreeRegister.$inject = ['HtmlTriggerTreeFactory'];

    function EventTriggerTreeRegister(HtmlTriggerTreeFactory, EventTriggerTreeService) {

        var self = this;

        self.HTML = 'html';

        var treeMap = {
            html: HtmlTriggerTreeFactory.create()
        };

        /* Public interface */
        self.getEventTriggerTree = getEventTriggerTree;
        self.registerEventTrigger = registerEventTrigger;

        function getEventTriggerTree(treeName) {
            return treeMap[treeName];
        }

        function registerEventTrigger(triggerToRegister) {
            var trigger = triggerToRegister.getInstance();
            var triggerTree = treeMap[trigger.tree];
            var triggerInitializer = triggerTree.getTriggerInitializer(trigger.sourceComponentType);

            triggerInitializer.registerEventTrigger(trigger);
        }

    }

}());
