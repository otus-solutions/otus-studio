(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('OtusAddButtonWidgetFactory', OtusAddButtonWidgetFactory);

    OtusAddButtonWidgetFactory.$inject = [
        'UUID',
        'AddQuestionEventFactory'
    ];

    function OtusAddButtonWidgetFactory(UUID, AddQuestionEventFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(bind) {
            bind.scope.widget = new OtusAddButtonWidget(bind, UUID.generateUUID(), AddQuestionEventFactory);
            return bind.scope.widget;
        }

        return self;
    }

    function OtusAddButtonWidget(bind, guid, AddQuestionEventFactory) {
        var self = this;

        /* Type definitions */
        self.name = 'OtusAddButton';

        /* Instance definitions */
        self.guid = guid;
        self.ngModel = bind.scope.ngModel;

        /* User definitions */
        self.label = bind.scope.label;
        self.ariaLabel = bind.scope.ariaLabel || self.label;

        /* CSS definitions */
        self.css = {};
        self.css.class = bind.scope.class;

        bind.element.on('click', function() {
            if (self.ngModel.includes('Question'))
                AddQuestionEventFactory.create().execute(self);
        });
    }

}());
