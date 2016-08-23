(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('WidgetService', WidgetService);

    WidgetService.$inject = [
        'WidgetTemplateService',
        'SurveyItemWidgetFactory',
        'SurveyItemEditorWidgetFactory',
        'AnswerOptionWidgetFactory',
        'MetadataGroupWidgetFactory',
        'MetadataOptionWidgetFactory'
    ];

    function WidgetService(WidgetTemplateService, SurveyItemWidgetFactory, SurveyItemEditorWidgetFactory, AnswerOptionWidgetFactory,
        MetadataGroupWidgetFactory, MetadataOptionWidgetFactory) {

        var self = this;

        self.widgetMap = {};

        /* Public interface */
        self.getWidgetForModel = getWidgetForModel;
        self.getMetadataWidget = getMetadataWidget;
        self.getSurveyItemEditorWidget = getSurveyItemEditorWidget;
        self.getQuestionAnswerOptionWidget = getQuestionAnswerOptionWidget;
        self.getMetadataAnswerOptionWidget = getMetadataAnswerOptionWidget;

        function getWidgetForModel(model) {
            var widget = SurveyItemWidgetFactory.create(model);
            widget.template = WidgetTemplateService.getDirectiveTemplate(model.objectType);
            return widget;
        }

        function getMetadataWidget(model) {
            var widget = MetadataGroupWidgetFactory.create(model);
            widget.template = WidgetTemplateService.getDirectiveTemplate('MetadataGroup');
            return widget;
        }

        function getSurveyItemEditorWidget(question) {
            return SurveyItemEditorWidgetFactory.create(question);
        }

        function getQuestionAnswerOptionWidget(model) {
            return AnswerOptionWidgetFactory.create(model);
        }

        function getMetadataAnswerOptionWidget(model) {
            return MetadataOptionWidgetFactory.create(model);
        }
    }

}());
