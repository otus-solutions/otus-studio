(function() {

    angular
        .module('core')
        .factory('TriggerInitializerFactory', TriggerInitializerFactory);

    function TriggerInitializerFactory() {
        var self = this;

        /* Public interface */
        self.produceInitializer = produceInitializer;

        function produceInitializer() {
            return new TriggerInitializer();
        }

        return this;
    }

    function TriggerInitializer() {
        var self = this;
        self.triggers = [];

        /* Public interface */
        self.run = run;
        self.registerTrigger = registerTrigger;

        function run(domComponent) {
            self.triggers.forEach(function(trigger) {
                trigger.watchDomComponent(domComponent);
            });

            return self.triggers;
        }

        function registerTrigger(trigger) {
            self.triggers.push(trigger);
        }
    }

}());
