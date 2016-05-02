(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('OtusButtonWidgetFactory', OtusButtonWidgetFactory);

    function OtusButtonWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(templateData, element, parentWidget) {
            return new OtusButtonWidget(templateData, element, parentWidget);
        }

        return self;
    }

    function OtusButtonWidget(templateData, element, parentWidget) {
        var self = this;

        /* Type definitions */
        self.className = self.constructor.name;
        self.template = {};
        self.css = {};

        /* Template definitions */
        self.template.ariaLabel = templateData.ariaLabel || templateData.label;
        self.template.iconButton = (templateData.iconButton !== undefined) ? 'md-icon-button' : '';
        self.template.icon = templateData.icon;
        self.template.label = templateData.label;
        self.template.tooltip = templateData.tooltip || self.label;

        /* CSS definitions */
        self.css.class = templateData.class;

        /* Instance definitions */
        self.parent = parentWidget;
        self.click = templateData.click;

        element.on('click', function onClick() {
            self.click();
        });
    }

}());
