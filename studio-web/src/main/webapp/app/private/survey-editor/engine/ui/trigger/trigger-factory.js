(function() {
    'use strict';

    angular
        .module('editor.engine.ui')
        .factory('TriggerFactory', TriggerFactory);

    TriggerFactory.$inject = [
        'HtmlTriggerFactory',
        'QuestionTriggerFactory',
        'StringNormalizer'
    ];

    function TriggerFactory(HtmlTriggerFactory, QuestionTriggerFactory, StringNormalizer) {

        var self = this;

        var factoryMap = {
            /* Html */
            inputText: HtmlTriggerFactory,
            textArea: HtmlTriggerFactory,
            divEditable: HtmlTriggerFactory,
            addButton: HtmlTriggerFactory,
            removeButton: HtmlTriggerFactory,
            updateButton: HtmlTriggerFactory,
            inputNumber: HtmlTriggerFactory,
            inputEmail: HtmlTriggerFactory,

            /* Html */
            questionEditor: QuestionTriggerFactory
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
