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

        /* Public interface */
        self.create = create;

        function create(bind) {
            bind.scope.widget = new OtusInputTextWidget(bind, UUID.generateUUID());
            return bind.scope.widget;
        }

        return self;
    }

    function OtusInputTextWidget(bind, guid) {
        var self = this;

        /* Type definitions */
        self.name = 'OtusInputText';

        /* Instance definitions */
        self.guid = guid;
        self.ngModel = '';

        /* User definitions */
        self.label = bind.scope.label;
        self.ariaLabel = bind.scope.ariaLabel;
        self.leftIcon = bind.scope.leftIcon;

        bind.element.on('change', function() {
            console.log(self.ngModel);
        });
    }

}());
