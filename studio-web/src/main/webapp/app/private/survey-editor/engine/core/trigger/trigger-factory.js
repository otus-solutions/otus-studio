(function() {

    angular
        .module('core')
        .factory('TriggerFactory', TriggerFactory);

    TriggerFactory.$inject = ['HtmlTriggerFactory', 'StringNormalizer'];

    function TriggerFactory(HtmlTriggerFactory, StringNormalizer) {

        var self = this;

        var factoryMap = {
            /* Html */
            inputText: HtmlTriggerFactory,
            inputNumber: HtmlTriggerFactory,
            inputEmail: HtmlTriggerFactory,
            textArea: HtmlTriggerFactory,
            button: HtmlTriggerFactory

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
        self.produceTriggers = produceTriggers;

        /*
         * Return a list of triggers that should be applied to editing source
         */
        function produceTriggers(editingSource) {
            var selectedFactory = selectFactory(editingSource);
            var triggers = selectedFactory.produceTriggers(editingSource);

            return triggers;
        }

        /*
         * The correct trigger factory is selected based on tag name of HTML component.
         * The factoryMap object mapping tag name and respectives factory.
         */
        function selectFactory(editingSource) {
            var componentName = StringNormalizer.normalizeString(editingSource.type);
            var factory = getFactoryByComponentName(componentName);

            return factory;
        }

        function getFactoryByComponentName(componentName) {
            return factoryMap[componentName];
        }

        return self;
    }

}());
