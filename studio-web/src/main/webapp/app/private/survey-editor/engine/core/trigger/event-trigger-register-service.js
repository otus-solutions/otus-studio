(function() {

    angular
        .module('core')
        .service('EventTriggerRegister', ['HtmlEventTriggerTree', 'QuestionEventTriggerTree', EventTriggerRegister]);

    function EventTriggerRegister(HtmlEventTriggerTree, QuestionEventTriggerTree) {
        var self = this;
        var provider = {
            html: new HtmlEventTriggerTree()
        };

        self.setEventTrigger = setEventTrigger;
        self.getEventTriggerTree = getEventTriggerTree;

        function setEventTrigger(eventTrigger) {
            var triggerTree = provider[eventTrigger.type];
            var triggerType = triggerTree.getTriggerType(eventTrigger.source);
            triggerType.registerEventTrigger(eventTrigger);
        }

        function getEventTriggerTree(tree) {
            return provider[tree];
        }
    }

}());
