(function() {

    angular
        .module('editor.engine.core')
        .service('SurveyEventTriggerService', ['EventTriggerProcessor', SurveyEventTriggerService]);

    function SurveyEventTriggerService(EventTriggerProcessor) {
        var self = this;

        self.init = init;

        function init() {
            var target = document.querySelector('survey-page');
            var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type == 'childList') {
                        var processor = new EventTriggerProcessor('survey.questions', 'update-model');
                        processor.storeNewState(mutation.addedNodes);
                        processor.run();
                    }
                });
            });
            // configuration of the observer:
            var config = {
                attributes: true,
                childList: true,
                characterData: true,
                subtree: true
            };
            // pass in the target node, as well as the observer options
            observer.observe(target, config);
        }
    }

}());
