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
        self.ngModel = '';

        /* User definitions */
        self.user = {};
        self.label = scope.label;
        self.ariaLabel = scope.ariaLabel;
        self.leftIcon = scope.leftIcon;
        self.model = scope.model;

        element.on('change', function() {
            self.parentWidget[self.model] = self.ngModel;
        });
    }

}());
