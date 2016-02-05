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
        self.loader = {};

        /* Public interface */
        self.run = run;
        self.wrapTrigger = wrapTrigger;

        function run(editingSource) {
            var trigger = self.loader.service.getTrigger();
            
            trigger.editingSource = editingSource;
            trigger.watchDomComponent(editingSource.component);
            self.loader.triggersLoaded.push(trigger);

            return trigger;
        }

        function wrapTrigger(triggerService) {
            var register = {
                service: triggerService,
                triggersLoaded: []
            };
            self.loader = register;
        }
    }

}());
