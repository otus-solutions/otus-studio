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

        function run(editingSource) {
            self.trigger.editingSource = editingSource;
            self.trigger.watchDomComponent(editingSource.component);
            return self.trigger;
        }

        function wrapTrigger(trigger) {
            self.trigger = trigger;
        }
    }

}());
