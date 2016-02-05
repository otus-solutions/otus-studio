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
        self.trigger = null;

        /* Public interface */
        self.run = run;
        self.wrapTrigger = wrapTrigger;

        function run(domComponent) {
            self.trigger.watchDomComponent(domComponent);
            return self.trigger;
        }

        function wrapTrigger(trigger) {
            self.trigger = trigger;
        }
    }

}());
