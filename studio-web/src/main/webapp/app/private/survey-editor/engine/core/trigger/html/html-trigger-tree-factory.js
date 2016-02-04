(function() {

    angular
        .module('core')
        .factory('HtmlTriggerTreeFactory', HtmlTriggerTreeFactory);

    HtmlTriggerTree.$inject = ['TriggerInitializerFactory'];

    function HtmlTriggerTreeFactory(TriggerInitializerFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new HtmlTriggerTree(TriggerInitializerFactory);
        }

        return self;
    }

    function HtmlTriggerTree(TriggerInitializerFactory) {

        var self = this;

        self.input = {
            text: TriggerInitializerFactory.create(),
            password: TriggerInitializerFactory.create(),
            number: TriggerInitializerFactory.create()
        };

        self.textarea = {
            textarea: TriggerInitializerFactory.create()
        };

        self.button = {
            button: TriggerInitializerFactory.create()
        };

        /* Public interface */
        self.getTriggerInitializer = getTriggerInitializer;

        function getTriggerInitializer(triggerPath) {
            var pathTokens = triggerPath.split('.');
            var reference = self;

            pathTokens.forEach(function(token) {
                reference = reference[token];
            });

            return reference;
        }

    }

}());
