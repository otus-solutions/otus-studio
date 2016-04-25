(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('OtusAddButtonWidgetFactory', OtusAddButtonWidgetFactory);

    OtusAddButtonWidgetFactory.$inject = [
        'UUID',
        'AddQuestionEventFactory',
        'AddMetadataAnswerEventFactory'
    ];

    function OtusAddButtonWidgetFactory(UUID, AddQuestionEventFactory, AddMetadataAnswerEventFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(bind) {
            bind.scope.widget = new OtusAddButtonWidget(bind, UUID.generateUUID(), AddQuestionEventFactory, AddMetadataAnswerEventFactory);
            return bind.scope.widget;
        }

        return self;
    }

    function OtusAddButtonWidget(bind, guid, AddQuestionEventFactory, AddMetadataAnswerEventFactory) {
        var self = this;
        var _bind = bind;

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
            if (self.ngModel.includes('Question')) {
                AddQuestionEventFactory.create().execute(self);
            } else if (self.ngModel.includes('MetadataAnswer')) {
                self.currentQuestion = _bind.workspace.currentQuestion;
                AddMetadataAnswerEventFactory.create().execute(self);
            }
        });
    }

}());
