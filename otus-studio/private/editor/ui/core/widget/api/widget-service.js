(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('WidgetService', WidgetService);

    WidgetService.$inject = [
        'WidgetTemplateService',
        'QuestionWidgetFactory',
        'QuestionEditorWidgetFactory',
        'QuestionAnswerOptionEditorWidgetFactory',
        'MetadataQuestionWidgetFactory',
        'MetadataAnswerOptionWidgetFactory'
    ];

    function WidgetService(WidgetTemplateService, QuestionWidgetFactory, QuestionEditorWidgetFactory, QuestionAnswerOptionEditorWidgetFactory, MetadataQuestionWidgetFactory, MetadataAnswerOptionWidgetFactory) {
        var self = this;

        /* Public interface */
        self.getWidgetForModel = getWidgetForModel;
        self.getMetadataWidget = getMetadataWidget;
        self.getQuestionEditorWidget = getQuestionEditorWidget;
        self.getQuestionAnswerOptionWidget = getQuestionAnswerOptionWidget;
        self.getMetadataAnswerOptionWidget = getMetadataAnswerOptionWidget;

        function getWidgetForModel(model) {
            var widget = QuestionWidgetFactory.create(model);
            widget.template = WidgetTemplateService.getDirectiveTemplate(model.objectType);
            return widget;
        }

        function getMetadataWidget(model) {
            var widget = MetadataQuestionWidgetFactory.create(model);
            widget.template = WidgetTemplateService.getDirectiveTemplate('MetadataGroup');
            return widget;
        }

        function getQuestionEditorWidget(model, metadataWidget) {
            return QuestionEditorWidgetFactory.create(model, metadataWidget);
        }

        function getQuestionAnswerOptionWidget(model) {
            return QuestionAnswerOptionEditorWidgetFactory.create(model);
        }

         function getMetadataAnswerOptionWidget(model) {
            return MetadataAnswerOptionWidgetFactory.create(model);
        }
    }

}());
