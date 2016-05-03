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

    function OtusButtonWidget(templateData, templateConfig, element, parentWidget) {
        var self = this;

        /* Type definitions */
        self.className = self.constructor.name;
        self.css = {};

        /* Template definitions */
        self.template = templateConfig;
        self.template.iconButton = (templateConfig.iconButton !== undefined && templateConfig.iconButton === "true") ? 'md-icon-button' : '';
        self.template.ariaLabel = templateConfig.ariaLabel || templateConfig.label;
        self.template.tooltip = templateConfig.tooltip || self.label;
        self.template.hasIcon = (templateConfig.icon !== undefined || templateConfig.leftIcon !== undefined || templateConfig.rightIcon !== undefined);

        /* CSS definitions */
        self.css.class = templateConfig.class;

        /* Instance definitions */
        self.parent = parentWidget;
        self.click = templateData.click;
    }

}());
