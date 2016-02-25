(function() {
    'use strict';

    angular
        .module('editor.engine.ui')
        .factory('HtmlTriggerFactory', HtmlTriggerFactory);

    HtmlTriggerFactory.$inject = ['TriggerRegisterService'];

    function HtmlTriggerFactory(TriggerRegisterService) {
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
