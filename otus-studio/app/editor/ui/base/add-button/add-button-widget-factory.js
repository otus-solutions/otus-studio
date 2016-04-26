(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('OtusAddButtonWidgetFactory', OtusAddButtonWidgetFactory);

    OtusAddButtonWidgetFactory.$inject = [
        'UUID',
        'AddQuestionEventFactory',
        'AddMetadataAnswerEventFactory',
        'AddAnswerOptionEventFactory',
        'AddRouteEventFactory'
    ];

    function OtusAddButtonWidgetFactory(UUID, AddQuestionEventFactory, AddMetadataAnswerEventFactory, AddAnswerOptionEventFactory, AddRouteEventFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(templateData) {
            return new OtusAddButtonWidget(templateData, UUID.generateUUID(), AddQuestionEventFactory, AddMetadataAnswerEventFactory, AddAnswerOptionEventFactory, AddRouteEventFactory);
        }

        return self;
    }

    function OtusAddButtonWidget(templateData, guid, AddQuestionEventFactory, AddMetadataAnswerEventFactory, AddAnswerOptionEventFactory, AddRouteEventFactory) {
        var self = this;

        /* Type definitions */
        self.name = 'OtusAddButton';
        self.scope = templateData.scope;
        self.parentWidget = templateData.parentWidget;

        /* Instance definitions */
        self.guid = guid;
        self.ngModel = templateData.scope.ngModel;
        self.context = templateData.parentWidget.question;

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
            } else if (self.ngModel.includes('AnswerOption')) {
                AddAnswerOptionEventFactory.create().execute(self);
            } else if (self.ngModel.includes('Route')) {
                AddRouteEventFactory.create().execute(self);
            }
        });
    }

}());
