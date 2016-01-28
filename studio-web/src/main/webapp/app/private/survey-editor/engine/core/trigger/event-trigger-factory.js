(function() {

    angular
        .module('core')
        .factory('EventTriggerFactory', [
            'HtmlEventTriggerFactory',
            'QuestionEventTriggerFactory',
            'SurveyEventTriggerFactory',
            'StringNormalizer',
            EventTriggerFactory
        ]);

    function EventTriggerFactory(HtmlEventTriggerFactory, QuestionEventTriggerFactory, SurveyEventTriggerFactory, StringNormalizer) {
        var factoryMap = {
            input: HtmlEventTriggerFactory,
            textarea: HtmlEventTriggerFactory,
            button: HtmlEventTriggerFactory,
            text: QuestionEventTriggerFactory,
            number: QuestionEventTriggerFactory,
            date: QuestionEventTriggerFactory,
            time: QuestionEventTriggerFactory,
            surveyPage: SurveyEventTriggerFactory,

            get: function get(elementName) {
                return this[elementName];
            }
        };

        /* Factory interface */
        var factory = {
            selectFactory: function selectFactory(element) {
                var elementName = StringNormalizer.normalizeString(element.localName);
                return factoryMap[elementName];
            },
            produce: function produce(element, ngModel) {
                var selectedFactory = this.selectFactory(element[0]);
                selectedFactory.produce(element, ngModel);
            }
        };

        return factory;
    }

}());
