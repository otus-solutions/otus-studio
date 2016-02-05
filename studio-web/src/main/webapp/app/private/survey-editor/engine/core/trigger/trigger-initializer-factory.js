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
        self.wrapTrigger = wrapTrigger;

        function run(domComponent) {
            self.triggers.forEach(function(trigger) {
                trigger.watchDomComponent(domComponent);
            });

            return self.triggers;
        }

        function wrapTrigger(trigger) {
            self.triggers.push(trigger);
        }
    }

}());
