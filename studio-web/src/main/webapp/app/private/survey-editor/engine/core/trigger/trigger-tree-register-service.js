(function() {

    angular
        .module('core')
        .service('TriggerTreeRegisterService', TriggerTreeRegister);

    TriggerTreeRegister.$inject = ['HtmlTriggerTreeService'];

    function TriggerTreeRegister(HtmlTriggerTreeService) {

        var self = this;

        self.HTML = 'html';

        var treeMap = {
            html: HtmlTriggerTreeService.getTree()
        };

        /* Public interface */
        self.getHtmlTriggerTree = getHtmlTriggerTree;
        self.registerTrigger = registerTrigger;

        function getHtmlTriggerTree() {
            return treeMap[self.HTML];
        }

        function registerTrigger(triggerToRegister) {
            var trigger = triggerToRegister.getInstance();
            var triggerTree = treeMap[trigger.tree];
            var triggerInitializer = triggerTree.getTriggerInitializer(trigger.sourceComponentType);

            triggerInitializer.registerTrigger(trigger);
        }

    }

}());
