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

        function create(templateData) {
            return new OtusAddButtonWidget(templateData, UUID.generateUUID(), AddQuestionEventFactory, AddMetadataAnswerEventFactory);
        }

        return self;
    }

    function OtusAddButtonWidget(templateData, guid, AddQuestionEventFactory, AddMetadataAnswerEventFactory) {
        var self = this;

        /* Type definitions */
        self.name = 'OtusAddButton';

        /* Instance definitions */
        self.guid = guid;
        self.ngModel = templateData.scope.ngModel;
        self.context = templateData.context;

        /* User definitions */
        self.label = templateData.scope.label;
        self.ariaLabel = templateData.scope.ariaLabel || self.label;

        /* CSS definitions */
        self.css = {};
        self.css.class = templateData.scope.class;

        templateData.element.on('click', function() {
            if (self.ngModel.includes('Question')) {
                AddQuestionEventFactory.create().execute(self);
            } else if (self.ngModel.includes('MetadataOption')) {
                AddMetadataAnswerEventFactory.create().execute(self);
            }
        });
    }

}());
