(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('OtusInputTextWidgetFactory', OtusInputTextWidgetFactory);

    function OtusInputTextWidgetFactory() {
        var self = this;

        self.create = create;

        function create(templateData, templateConfig, element, parentWidget) {
            return new OtusInputTextWidget(templateData, templateConfig, element, parentWidget);
        }

        return self;
    }

    function OtusInputTextWidget(templateData, templateConfig, element, parentWidget) {
        var self = this;

        /* Type definitions */
        self.className = self.constructor.name;
        self.css = {};
        self.template = {};
        self.event = {};

        /* Template definitions */
        self.template.ariaLabel = templateConfig.ariaLabel || templateConfig.label;
        self.template.label = templateConfig.label;
        self.template.leftIcon = templateConfig.iconButton || templateConfig.leftIcon;
        self.template.rightIcon = templateConfig.rightIcon;

        self.template.hasLeftIcon = self.template.leftIcon !== undefined;
        self.template.hasRightIcon = (templateConfig.iconButton === undefined && self.template.rightIcon !== undefined);

        /* Instance definitions */
        self.parent = parentWidget;
        self.modelReference = templateData.model;

        /* CSS definitions */
        self.style = templateData.style;

        if (templateData.model instanceof Function)
            self.model = templateData.model();
        else
            self.model = templateData.model;

        element.on('change', function() {
            if (self.modelReference instanceof Function)
                self.modelReference(self.model);
            else
                self.modelReference = self.model;
        });
    }

}());
