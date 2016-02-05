(function() {

    angular
        .module('core')
        .service('TriggerTreeRegisterService', TriggerTreeRegister);

    TriggerTreeRegister.$inject = ['HtmlTriggerTreeService'];

    function TriggerTreeRegister(HtmlTriggerTreeService) {

        var self = this;

        self.HTML = 'html';

        var treeMap = {
            html: HtmlTriggerTreeService
        };

        /* Public interface */
        self.getHtmlTriggerTree = getHtmlTriggerTree;
        self.registerTrigger = registerTrigger;

        function getHtmlTriggerTree() {
            return treeMap[self.HTML].getTree();
        }

        function registerTrigger(triggerToRegister) {
            var trigger = triggerToRegister.getInstance();
            var triggerTree = treeMap[trigger.tree].getTree();
            var triggerInitializer = triggerTree.getTriggerInitializer(trigger.sourceComponentType);

            triggerInitializer.registerTrigger(trigger);
        }

    }

}());
