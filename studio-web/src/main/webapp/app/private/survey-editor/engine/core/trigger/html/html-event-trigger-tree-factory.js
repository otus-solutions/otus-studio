(function() {

    angular
        .module('core')
        .factory('HtmlEventTriggerTree', [HtmlEventTriggerTree]);

    function HtmlEventTriggerTree() {
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

        var tree = function HtmlEventTriggerTree() {
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
