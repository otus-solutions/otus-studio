(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('OtusQuestionPaletteWidgetFactory', OtusQuestionPaletteWidgetFactory);

    OtusQuestionPaletteWidgetFactory.$inject = [
        'UUID'
    ];

    function OtusQuestionPaletteWidgetFactory(UUID) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(bind) {
            bind.scope.widget = new OtusQuestionPaletteWidget(bind, UUID.generateUUID());
            return bind.scope.widget;
        }

        return self;
    }

    function OtusQuestionPaletteWidget(bind, guid) {
        var self = this;

        /* Type definitions */
        self.name = 'OtusQuestionPalette';

        /* Instance definitions */
        self.guid = guid;
        self.ngModel = '';

        /* User definitions */
        self.label = bind.scope.label;
        self.ariaLabel = bind.scope.ariaLabel;
        self.leftIcon = bind.scope.leftIcon;
    }

}());
