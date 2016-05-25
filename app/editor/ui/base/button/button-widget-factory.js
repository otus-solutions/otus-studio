(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('OtusButtonWidgetFactory', OtusButtonWidgetFactory);

    function OtusButtonWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(templateData, templateConfig, parentWidget) {
            return new OtusButtonWidget(templateData, templateConfig, parentWidget);
        }

        return self;
    }

    function OtusButtonWidget(templateData, templateConfig, parentWidget) {
        var self = this;

        /* Valid values */
        var validTooltipDirections = ['top', 'bottom', 'left', 'right'];

        /* Type definitions */
        self.className = self.constructor.name;
        self.css = {};
        self.template = {};
        self.event = {};

        /* Template definitions */
        self.template.ariaLabel = templateConfig.ariaLabel || templateConfig.label;
        self.template.label = templateConfig.label;
        self.template.tooltip = templateConfig.tooltip || templateConfig.label;
        self.template.tooltipDirection = (templateConfig.tooltipDirection !== undefined && (validTooltipDirections.indexOf(templateConfig.tooltipDirection) !== -1)) ? templateConfig.tooltipDirection : 'top';
        self.template.leftIcon = templateConfig.iconButton || templateConfig.leftIcon;
        self.template.rightIcon = templateConfig.rightIcon;

        self.template.hasLeftIcon = self.template.leftIcon !== undefined;
        self.template.hasRightIcon = (templateConfig.iconButton === undefined && self.template.rightIcon !== undefined);

        /* CSS definitions */
        self.css.iconButton = (templateConfig.iconButton !== undefined) ? 'md-icon-button' : '';

        /* Instance definitions */
        self.parent = parentWidget;

        /* Event definitions */
        self.event.click = templateData.click;
    }

}());
