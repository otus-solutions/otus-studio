(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('WidgetService', WidgetService);

    WidgetService.$inject = [
        'WidgetTemplateService',
        'SurveyItemWidgetFactory',
        'SurveyItemEditorWidgetFactory',
        'QuestionAnswerOptionEditorWidgetFactory',
        'MetadataGroupWidgetFactory',
        'MetadataOptionWidgetFactory',
        'NavigationWidgetFactory',
        'RouteEditorWidgetFactory',
        'RouteCreatorWidgetFactory'
    ];

    function WidgetService(WidgetTemplateService, SurveyItemWidgetFactory, SurveyItemEditorWidgetFactory, QuestionAnswerOptionEditorWidgetFactory,
        MetadataGroupWidgetFactory, MetadataOptionWidgetFactory, NavigationWidgetFactory, RouteEditorWidgetFactory, RouteCreatorWidgetFactory) {

        var self = this;

        self.widgetMap = {};

        /* Public interface */
        self.getWidgetForModel = getWidgetForModel;
        self.getMetadataWidget = getMetadataWidget;
        self.getSurveyItemEditorWidget = getSurveyItemEditorWidget;
        self.getQuestionAnswerOptionWidget = getQuestionAnswerOptionWidget;
        self.getMetadataAnswerOptionWidget = getMetadataAnswerOptionWidget;
        self.getNavigationEditorWidget = getNavigationEditorWidget;
        self.getRouteWidget = getRouteWidget;
        self.getRouteCreatorWidget = getRouteCreatorWidget;

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
            return QuestionAnswerOptionEditorWidgetFactory.create(model);
        }

        function getMetadataAnswerOptionWidget(model) {
            return MetadataOptionWidgetFactory.create(model);
        }

        function getNavigationEditorWidget(model) {
            return NavigationWidgetFactory.create(model);
        }

        function getRouteWidget(navigation, model) {
            return RouteEditorWidgetFactory.create(navigation, model);
        }

        function getRouteCreatorWidget(model, element) {
            var widget = RouteCreatorWidgetFactory.create(model, element);

            self.widgetMap[widget.type] = self.widgetMap[widget.type] || {};
            self.widgetMap[widget.type][widget.name.guid] = widget.name;
            self.widgetMap[widget.type][widget.destination.guid] = widget.destination;
            self.widgetMap[widget.type][widget.processor.guid] = widget.processor;
            return widget;
        }
    }

}());
