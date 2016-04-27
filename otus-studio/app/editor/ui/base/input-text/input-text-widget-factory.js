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

        function create(scope, element, parentWidget) {
            return new OtusInputTextWidget(scope, element, parentWidget, UUID.generateUUID());
        }

        return self;
    }

    function OtusInputTextWidget(scope, element, parentWidget, guid) {
        var self = this;

        /* Type definitions */
        self.name = 'OtusInputText';

        /* Instance definitions */
        self.parentWidget = parentWidget;
        self.guid = guid;

        /* User definitions */
        self.label = scope.label;
        self.ariaLabel = scope.ariaLabel || self.label;
        self.leftIcon = scope.leftIcon;
        self.modelRef = scope.model;

        if (scope.model instanceof Function)
            self.model = scope.model();
        else
            self.model = scope.model;

        element.on('change', function() {
            if (self.modelRef instanceof Function)
                self.modelRef(self.model);
            else
                self.modelRef = self.model;
        });
    }

}());
