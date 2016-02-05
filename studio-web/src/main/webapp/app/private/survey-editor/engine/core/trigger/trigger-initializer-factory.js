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

        function run(editingSource) {
            self.triggers.forEach(function(trigger) {
                trigger.editingSource = editingSource;
                trigger.watchDomComponent(editingSource.component);
            });
            return self.triggers;
        }

        function wrapTrigger(trigger) {
            self.triggers.push(trigger);
        }
    }

}());
