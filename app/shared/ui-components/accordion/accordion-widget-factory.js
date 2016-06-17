(function() {
    'use strict';

    angular
        .module('ui.components')
        .factory('OtusAccordionWidgetFactory', OtusAccordionWidgetFactory);

    function OtusAccordionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(templateData, templateConfig, parentWidget) {
            return new OtusAccordionWidget(templateData, templateConfig, parentWidget);
        }

        return self;
    }

    function OtusAccordionWidget(templateData, templateConfig, parentWidget) {
        var self = this;

        /* Type definitions */
        self.className = self.constructor.name;
        self.css = {};
        self.template = {};
        self.event = {};

        /* Template definitions */
        self.template.icon = 'expand_more';

        /* CSS definitions */

        /* Instance definitions */
        self.parent = parentWidget;
        self.isToShow = true;

        self.changeState = changeState;

        function changeState() {
            self.isToShow = !self.isToShow;
            self.template.icon = (self.isToShow) ? 'expand_less' : 'expand_more';
        }
    }

}());
