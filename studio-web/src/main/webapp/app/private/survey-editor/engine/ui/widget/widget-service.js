(function() {
    'use strict';

    angular
        .module('editor.engine.ui')
        .service('WidgetService', WidgetService);

    WidgetService.$inject = [
        'SurveyComponentsService',
        'QuestionWidgetFactory',
        'QuestionEditorWidgetFactory'
    ];

    function WidgetService(SurveyComponentsService, QuestionWidgetFactory, QuestionEditorWidgetFactory) {
        var self = this;

        /* Public interface */
        self.getWidgetForModel = getWidgetForModel;
        self.getQuestionEditorWidget = getQuestionEditorWidget;

        function getWidgetForModel(model) {
            var widget = QuestionWidgetFactory.create(model);
            widget.template = SurveyComponentsService.getDirectiveTemplate(model.objectType);
            return widget;
        }

        function getQuestionEditorWidget(questionWidget) {
            return QuestionEditorWidgetFactory.create(questionWidget);
        }
    }

}());
