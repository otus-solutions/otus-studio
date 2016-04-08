(function() {
    'use strict';

    angular
        .module('editor.core')
        .service('TriggerRegisterService', TriggerRegisterService);

    TriggerRegisterService.$inject = ['TriggerInitializerFactory'];

    function TriggerRegisterService(TriggerInitializerFactory) {
        var self = this;
        self.initializers = {};

        /* Public interface */
        self.getInitializer = getInitializer;
        self.registerTriggerService = registerTriggerService;

        function getInitializer(initializerType) {
            return self.initializers[initializerType];
        }

        function registerTriggerService(triggerService) {
            var triggerInitializer = TriggerInitializerFactory.produceInitializer();
            triggerInitializer.wrapTrigger(triggerService);
            self.initializers[triggerService.getSourceComponentType()] = triggerInitializer;
        }
    }

}());
