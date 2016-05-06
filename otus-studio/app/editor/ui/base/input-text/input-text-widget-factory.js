(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('OtusInputTextWidgetFactory', OtusInputTextWidgetFactory);

    OtusInputTextWidgetFactory.$inject = [
        'UUID'
    ];

    function OtusInputTextWidgetFactory(UUID) {
        var self = this;

        self.create = create;

        function create(templateData, element, model, parentWidget) {
            return new OtusInputTextWidget(templateData, element, model, parentWidget, UUID.generateUUID());
        }

        return self;
    }

    function OtusInputTextWidget(templateData, element, model, parentWidget, guid) {
        var self = this;

        /* Type definitions */
        self.name = 'OtusInputText';

        /* Instance definitions */
        self.parentWidget = parentWidget;
        self.guid = guid;

        /* User definitions */
        self.style = templateData.style;
        self.flex = templateData.flex;
        self.label = templateData.label;
        self.ariaLabel = templateData.ariaLabel || self.label;
        self.leftIcon = templateData.leftIcon;
        self.modelRef = model;

        if (model instanceof Function)
            self.model = model();
        else
            self.model = model;

        element.on('change', function() {
            if (self.modelRef instanceof Function)
                self.modelRef(self.model);
            else
                self.modelRef = self.model;
        });
    }

}());
