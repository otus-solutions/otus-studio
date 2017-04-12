(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('WidgetTemplateService', WidgetTemplateService);

    function WidgetTemplateService() {
        var self = this,

            directiveTemplates = {
                'CalendarQuestion': '<calendar-question></calendar-question>',
                'IntegerQuestion': '<integer-question></integer-question>',
                'SingleSelectionQuestion': '<single-selection-question></single-selection-question>',
                'TextQuestion': '<text-question></text-question>',
                'TimeQuestion': '<time-question></time-question>',
                'PhoneQuestion': '<phone-question></phone-question>',
                'CheckboxQuestion': '<checkbox-question></checkbox-question>',
                'MetadataGroup' : '<metadata-question></metadata-question>',

            };

        /* Public interface */
        self.getDirectiveTemplate = getDirectiveTemplate;

        function getDirectiveTemplate(directive) {
            return directiveTemplates[directive];
        }
    }

}());
