(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('OtusAddButtonWidgetFactory', OtusAddButtonWidgetFactory);

    OtusAddButtonWidgetFactory.$inject = [
        'AddQuestionEventFactory',
        'AddMetadataAnswerEventFactory',
        'AddAnswerOptionEventFactory',
        'AddRouteEventFactory',
        'AddRuleEventFactory'
    ];

    function OtusAddButtonWidgetFactory(AddQuestionEventFactory, AddMetadataAnswerEventFactory, AddAnswerOptionEventFactory, AddRouteEventFactory, AddRuleEventFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(templateData, element, model, parentWidget) {
            return new OtusAddButtonWidget(templateData, element, model, parentWidget, AddQuestionEventFactory, AddMetadataAnswerEventFactory, AddAnswerOptionEventFactory, AddRouteEventFactory, AddRuleEventFactory);
        }

        return self;
    }

    function OtusAddButtonWidget(templateData, element, model, parentWidget, AddQuestionEventFactory, AddMetadataAnswerEventFactory, AddAnswerOptionEventFactory, AddRouteEventFactory, AddRuleEventFactory) {
        var self = this;

        /* Type definitions */
        self.name = 'OtusAddButton';
        self.parentWidget = parentWidget;

        /* Instance definitions */
        self.ngModel = templateData.ngModel;
        if (parentWidget) {
            self.context = parentWidget.question;
        }

        /* User definitions */
        self.iconButton = (templateData.iconButton !== undefined) ? 'md-icon-button' : '';
        self.icon = templateData.icon;
        self.label = templateData.label;
        self.tooltip = templateData.tooltip || self.label;
        self.ariaLabel = templateData.ariaLabel || self.label;
        self.model = model;

        /* CSS definitions */
        self.css = {};
        self.css.class = templateData.class;

        element.on('click', function() {
            if (self.ngModel.includes('MetadataOption')) {
                AddMetadataAnswerEventFactory.create().execute(self);
            } else if (self.ngModel.includes('AnswerOption')) {
                AddAnswerOptionEventFactory.create().execute(self);
            } else if (self.ngModel.includes('Rule')) {
                AddRuleEventFactory.create().execute(self);
            }
        });
    }

}());
