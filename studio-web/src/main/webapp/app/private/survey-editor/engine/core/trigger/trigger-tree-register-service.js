(function() {

    angular
        .module('core')
        .service('TriggerRegisterService', TriggerRegisterService);

    TriggerRegisterService.$inject = ['TriggerInitializerFactory'];

    function TriggerRegisterService(TriggerInitializerFactory) {
        var self = this;
        self.registeredInitializers = {};

        /* Public interface */
        self.getInitializer = getInitializer;
        self.registerTrigger = registerTrigger;

        function getInitializer(initializerType) {
            return self.registeredInitializers[initializerType];
        }

        function registerTrigger(trigger) {
            var triggerInitializer = TriggerInitializerFactory.produceInitializer();
            triggerInitializer.wrapTrigger(trigger);
            self.registeredInitializers[trigger.sourceComponentType] = triggerInitializer;
        }
    }

}());
