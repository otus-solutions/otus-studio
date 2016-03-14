(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('TriggerFactory', TriggerFactory);

    TriggerFactory.$inject = [
        'TriggerRegisterService',
        'StringNormalizer'
    ];

    function TriggerFactory(TriggerRegisterService, StringNormalizer) {
        var self = this;

        /* Public interface */
        self.produceTrigger = produceTrigger;

        function produceTrigger(editingSource) {
            var triggerInitializer = TriggerRegisterService.getInitializer(editingSource.type),
                initializedTrigger = triggerInitializer.run(editingSource);

            return initializedTrigger;
        }

        return self;
    }

}());
