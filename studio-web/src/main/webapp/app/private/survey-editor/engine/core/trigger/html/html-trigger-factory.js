(function() {

    angular
        .module('core')
        .factory('HtmlTriggerFactory', HtmlTriggerFactory);

    HtmlTriggerFactory.$inject = ['TriggerRegisterService'];

    function HtmlTriggerFactory(TriggerRegisterService) {

        var self = this;

        /* Public interface */
        self.produceTriggers = produceTriggers;

        function produceTriggers(editingSource) {
            var triggerInitializer = TriggerRegisterService.getInitializer(editingSource.type),
                initializedTriggers = triggerInitializer.run(editingSource.component, editingSource.target);

            return initializedTriggers;
        }

        return self;
    }

}());
