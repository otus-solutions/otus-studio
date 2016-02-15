(function() {

    angular
        .module('editor.engine.core')
        .factory('TriggerFactory', TriggerFactory);

    TriggerFactory.$inject = ['HtmlTriggerFactory', 'StringNormalizer'];

    function TriggerFactory(HtmlTriggerFactory, StringNormalizer) {

        var self = this;

        var factoryMap = {
            /* Html */
            inputText: HtmlTriggerFactory,
            divEditable: HtmlTriggerFactory,
            inputNumber: HtmlTriggerFactory,
            inputEmail: HtmlTriggerFactory,
            textArea: HtmlTriggerFactory,
            addButton: HtmlTriggerFactory

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
        self.produceTrigger = produceTrigger;

        /*
         * Return a list of triggers that should be applied to editing source
         */
        function produceTrigger(editingSource) {
            var selectedFactory = selectFactory(editingSource);
            var trigger = selectedFactory.produceTrigger(editingSource);

            return trigger;
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
