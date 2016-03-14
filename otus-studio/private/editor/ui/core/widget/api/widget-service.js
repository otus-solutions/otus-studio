(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('WidgetService', WidgetService);

    WidgetService.$inject = [
        'WidgetTemplateService',
        'QuestionWidgetFactory',
        'QuestionEditorWidgetFactory',
        'QuestionAnswerOptionEditorWidgetFactory'
    ];

    function WidgetService(WidgetTemplateService, QuestionWidgetFactory, QuestionEditorWidgetFactory, QuestionAnswerOptionEditorWidgetFactory) {
        var self = this;

        /* Public interface */
        self.getWidgetForModel = getWidgetForModel;
        self.getQuestionEditorWidget = getQuestionEditorWidget;
        self.getQuestionAnswerOptionWidget = getQuestionAnswerOptionWidget;

        function getWidgetForModel(model) {
            var widget = QuestionWidgetFactory.create(model);
            widget.template = WidgetTemplateService.getDirectiveTemplate(model.objectType);
            return widget;
        }

        function getQuestionEditorWidget(model) {
            return QuestionEditorWidgetFactory.create(model);
        }

        function getQuestionAnswerOptionWidget(model) {
            return QuestionAnswerOptionEditorWidgetFactory.create(model);
        }
    }

}());
