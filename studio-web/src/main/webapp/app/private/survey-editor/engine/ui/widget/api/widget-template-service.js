(function() {

    angular
        .module('editor.engine.ui')
        .service('SurveyComponentsService', SurveyComponentsService);

    function SurveyComponentsService() {
        var self = this,

            directiveTemplates = {
                'CalendarQuestion': '<calendar-question></calendar-question>',
                'NumericQuestion': '<numeric-question></numeric-question>',
                'SingleSelectionQuestion': '<single-selection-question></single-selection-question>',
                'TextQuestion': '<text-question></text-question>',
                'TimeQuestion': '<time-question></time-question>',
            };

        /* Public interface */
        self.getDirectiveTemplate = getDirectiveTemplate;

        function getDirectiveTemplate(directive) {
            return directiveTemplates[directive];
        }
    }

}());
