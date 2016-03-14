(function() {
    'use strict';

    angular
        .module('editor.core')
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
            var newTrigger = self.loader.service.getTrigger(editingSource);
            self.loader.triggersLoaded = newTrigger;
            return newTrigger;
        }

        function wrapTrigger(triggerService) {
            var newLoader = {
                service: triggerService,
                triggersLoaded: null
            };
            self.loader = newLoader;
        }
    }

}());
