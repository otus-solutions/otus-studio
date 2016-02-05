(function() {

    angular
        .module('core')
        .factory('HtmlTriggerFactory', HtmlTriggerFactory);

    HtmlTriggerFactory.$inject = ['TriggerRegisterService'];

    function HtmlTriggerFactory(TriggerRegisterService) {

        var self = this;

        /* Public interface */
        self.produceTrigger = produceTrigger;

        function produceTrigger(editingSource) {
            var triggerInitializer = TriggerRegisterService.getInitializer(editingSource.type),
                initializedTrigger = triggerInitializer.run(editingSource.component, editingSource.target);

            return initializedTrigger;
        }

        return self;
    }

}());
