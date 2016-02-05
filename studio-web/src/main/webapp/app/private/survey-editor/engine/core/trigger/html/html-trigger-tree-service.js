(function() {

    angular
        .module('core')
        .service('HtmlTriggerTreeService', HtmlTriggerTreeService);

    HtmlTriggerTreeService.$inject = ['TriggerInitializerFactory'];

    function HtmlTriggerTreeService(TriggerInitializerFactory) {

        var self = this;

        /* Service inicialization */
        init();

        /* Public interface */
        self.getTree = getTree;

        function getTree() {
            return self.tree;
        }

        function init() {
            self.tree = new HtmlTriggerTree(TriggerInitializerFactory);
        }

        return self;
    }

    function HtmlTriggerTree(TriggerInitializerFactory) {
        var self = this;

        /* Public interface */
        self.getTriggerInitializer = getTriggerInitializer;

        function getTriggerInitializer() {
            return TriggerInitializerFactory.produceInitializer();
        }
    }

}());
