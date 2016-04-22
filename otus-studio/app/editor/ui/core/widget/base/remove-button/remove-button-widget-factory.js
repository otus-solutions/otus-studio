(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('OtusRemoveButtonWidgetFactory', OtusRemoveButtonWidgetFactory);

    OtusRemoveButtonWidgetFactory.$inject = [
        'UUID',
        'AddQuestionEventFactory'
    ];

    function OtusRemoveButtonWidgetFactory(UUID) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(bind) {
            bind.scope.widget = new OtusRemoveButtonWidget(bind, UUID.generateUUID());
            return bind.scope.widget;
        }

        return self;
    }

    function OtusRemoveButtonWidget(bind, guid) {
        var self = this;

        /* Type definitions */
        self.name = 'OtusAddButton';

        /* Instance definitions */
        self.guid = guid;
        self.ngModel = bind.scope.ngModel;

        /* User definitions */
        self.label = bind.scope.label;
        self.ariaLabel = bind.scope.ariaLabel || self.label;
        self.icon = bind.scope.icon;

        /* CSS definitions */
        self.css = {};
        self.css.class = bind.scope.class;

        bind.element.on('click', function() {
            console.log(ngModel);
            if (self.ngModel.includes('Question'))
                AddQuestionEventFactory.create().execute(self);
        });
    }

}());
