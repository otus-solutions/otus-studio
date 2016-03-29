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
        'MetadataAnswerOptionWidgetFactory'
    ];

    function WidgetService(WidgetTemplateService, QuestionWidgetFactory, QuestionEditorWidgetFactory, QuestionAnswerOptionEditorWidgetFactory, MetadataQuestionWidgetFactory) {
        var self = this;

        /* Public interface */
        self.getWidgetForModel = getWidgetForModel;
        self.getMetadataWidget = getMetadataWidget;
        self.getQuestionEditorWidget = getQuestionEditorWidget;
        self.getQuestionAnswerOptionWidget = getQuestionAnswerOptionWidget;

        function getWidgetForModel(model) {
            var widget = QuestionWidgetFactory.create(model);
            widget.template = WidgetTemplateService.getDirectiveTemplate(model.objectType);
            return widget;
        }

        function getMetadataWidget(model) {
            return MetadataQuestionWidgetFactory.create(model);
        }

        function getQuestionEditorWidget(model) {
            return QuestionEditorWidgetFactory.create(model);
        }

        function getQuestionAnswerOptionWidget(model) {
            return QuestionAnswerOptionEditorWidgetFactory.create(model);
        }
    }

}());
