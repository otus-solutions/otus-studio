(function() {
    'use strict';

    angular
        .module('editor.engine.ui')
        .service('WidgetService', WidgetService);

    WidgetService.$inject = [
        'SurveyComponentsService',
        'QuestionWidgetFactory',
        'QuestionEditorWidgetFactory',
        'QuestionAnswerOptionEditorWidgetFactory'
    ];

    function WidgetService(SurveyComponentsService, QuestionWidgetFactory, QuestionEditorWidgetFactory, QuestionAnswerOptionEditorWidgetFactory) {
        var self = this;

        /* Public interface */
        self.getWidgetForModel = getWidgetForModel;
        self.getQuestionEditorWidget = getQuestionEditorWidget;
        self.getQuestionAnswerOptionWidget = getQuestionAnswerOptionWidget;

        function getWidgetForModel(model) {
            var widget = QuestionWidgetFactory.create(model);
            widget.template = SurveyComponentsService.getDirectiveTemplate(model.objectType);
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
