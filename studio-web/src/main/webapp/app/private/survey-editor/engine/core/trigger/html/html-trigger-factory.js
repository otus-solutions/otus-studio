(function() {

    angular
        .module('core')
        .factory('HtmlTriggerFactory', HtmlTriggerFactory);

    HtmlTriggerFactory.$inject = ['TriggerTreeRegisterService'];

    function HtmlTriggerFactory(TriggerTreeRegisterService) {

        var self = this,
            hasType = null;

        /* Public interface */
        self.produceTriggers = produceTriggers;

        function produceTriggers(editingSource) {
            var domComponent = editingSource.component,
                triggerPath = domComponent.localName.concat('.').concat(domComponent.type),

                tree = TriggerTreeRegisterService.getHtmlTriggerTree(),
                triggerInitializer = tree.getTriggerInitializer(triggerPath),
                initializedTriggers = triggerInitializer.run(domComponent, editingSource.target);

            return initializedTriggers;
        }

        return self;
    }

}());
