(function() {

    angular
        .module('core')
        .factory('TriggerFactory', TriggerFactory);

    TriggerFactory.$inject = ['HtmlTriggerFactory', 'StringNormalizer'];

    function TriggerFactory(HtmlTriggerFactory, StringNormalizer) {

        var self = this;

        var factoryMap = {
            /* Html */
            input: HtmlTriggerFactory
            /*
            textarea: HtmlEventTriggerFactory,
            button: HtmlEventTriggerFactory,
            */

            /* Question */
            /*
            text: QuestionEventTriggerFactory,
            number: QuestionEventTriggerFactory,
            date: QuestionEventTriggerFactory,
            time: QuestionEventTriggerFactory,
            surveyPage: SurveyEventTriggerFactory,
            */
        };

        /* Public interface */
        self.produce = produce;

        /*
         * Return a list of triggers that should be applied to editing source
         */
        function produce(editingSource) {
            var selectedFactory = selectFactory(editingSource.component);
            var triggers = selectedFactory.produce(editingSource);

            return triggers;
        }

        /*
         * The correct trigger factory is selected based on tag name of HTML component.
         * The factoryMap object mapping tag name and respectives factory.
         */
        function selectFactory(domComponent) {
            var componentName = StringNormalizer.normalizeString(domComponent.localName);
            var factory = getFactoryByComponentName(componentName);

            return factory;
        }

        function getFactoryByComponentName(componentName) {
            return factoryMap[componentName];
        }

        return self;
    }

}());
