(function() {

    angular
        .module('core')
        .factory('TriggerInitializerFactory', TriggerInitializerFactory);

    function TriggerInitializerFactory() {
        this.create = function create() {
            return {
                triggers: [],
                registerTrigger: function registerTrigger(eventTrigger) {
                    this.triggers.push(eventTrigger);
                },
                run: function init(domComponent) {
                    this.triggers.forEach(function(trigger) {
                        trigger.watchDomComponent(domComponent);
                    });

                    return this.triggers;
                }
            };
        };

        return this;
    }

}());
