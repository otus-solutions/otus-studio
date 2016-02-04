(function() {

    angular
        .module('core')
        .factory('EventTriggerFactory', EventTriggerFactory);

    EventTriggerFactory.$inject = ['HtmlEventTriggerFactory', 'StringNormalizer'];

    function EventTriggerFactory(HtmlEventTriggerFactory, StringNormalizer) {

        var self = this;

        var factoryMap = {
            input: HtmlEventTriggerFactory,
            /*
            textarea: HtmlEventTriggerFactory,
            button: HtmlEventTriggerFactory,
            text: QuestionEventTriggerFactory,
            number: QuestionEventTriggerFactory,
            date: QuestionEventTriggerFactory,
            time: QuestionEventTriggerFactory,
            surveyPage: SurveyEventTriggerFactory,
            */
        };

        /* Public interface */
        self.produce = produce;

        function produce(editingSource) {
            var selectedFactory = selectFactory(editingSource.component);
            var eventTriggerTree = selectedFactory.produce(editingSource);

            return eventTriggerTree;
        }

        function selectFactory(domComponent) {
            var componentName = StringNormalizer.normalizeString(domComponent.localName);
            var factory = getFactoryByComponentName(componentName);

            return factory;
        }

        function getFactoryByComponentName(componentName) {
            return factoryMap[componentName];
        }

        return this;
    }

}());
