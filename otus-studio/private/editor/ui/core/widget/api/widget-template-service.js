(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('WidgetTemplateService', WidgetTemplateService);

    function WidgetTemplateService() {
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
