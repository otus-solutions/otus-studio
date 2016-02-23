(function() {
    'use strict';

    angular
        .module('editor.engine.core')
        .factory('QuestionTriggerFactory', QuestionTriggerFactory);

    QuestionTriggerFactory.$inject = ['TriggerRegisterService'];

    function QuestionTriggerFactory(TriggerRegisterService) {

        var self = this;

        /* Public interface */
        self.produceTrigger = produceTrigger;

        function produceTrigger(editingSource) {
            var triggerInitializer = TriggerRegisterService.getInitializer(editingSource.type),
                initializedTrigger = triggerInitializer.run(editingSource);

            return initializedTrigger;
        }

        return self;
    }

}());
