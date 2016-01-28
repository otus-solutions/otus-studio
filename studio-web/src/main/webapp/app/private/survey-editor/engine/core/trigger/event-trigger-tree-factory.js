(function() {

    angular
        .module('core')
        .factory('EventTriggerTree', [EventTriggerTree]);

    function EventTriggerTree() {
        function TriggerType() {
            this.triggers = [];

            this.registerEventTrigger = function registerEventTrigger(eventTrigger) {
                this.triggers.push(eventTrigger);
            };

            this.init = function init(data, ngModel) {
                this.triggers.forEach(function(trigger) {
                    trigger.init(data, ngModel);
                });
            };
        }

        var tree = function EventTriggerTree(tree) {
            this.input = {
                text: new TriggerType(),
                password: new TriggerType(),
                number: new TriggerType()
            };
            this.textarea = {
                textarea: new TriggerType()
            };
            this.button = {
                button: new TriggerType()
            };

            this.getTriggerType = function getTriggerType(triggerPath) {
                var pathTokens = triggerPath.split('.');
                var reference = this;

                pathTokens.forEach(function(token) {
                    reference = reference[token];
                });

                return reference;
            };
        };

        return tree;
    }

}());
