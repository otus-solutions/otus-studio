(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('SurveyPageContentService', SurveyPageContentService);

    SurveyPageContentService.$inject = [
        'editor.ui.mpath',
        'TemplateLoaderService',
        'WidgetService',
        'UIUtils'
    ];

    function SurveyPageContentService(mpath, TemplateLoaderService, WidgetService, UIUtils) {
        var self = this,
            scope = null,
            surveyPage = null;

        /* Public interface */
        self.init = init;
        self.loadQuestion = loadQuestion;
        self.unloadQuestion = unloadQuestion;
        self.updateQuestion = updateQuestion;
        self.reset = reset;

        function init(scopeReference, surveyPageReference) {
            scope = scopeReference;
            surveyPage = surveyPageReference;
        }

        function reset() {
            surveyPage.find('[question-target]').remove();
        }

        function loadQuestion(question) {
            var questionWidget = loadQuestionWidget(question);
            var metadataWidget = loadMetadataWidget(question);
            var editorWidget = loadEditorWidget(questionWidget, metadataWidget);

            mergeScopeData(editorWidget);
            loadTemplate();
        }

        function unloadQuestion(question) {
            surveyPage.find('[question-target="' + question.templateID + '"]').remove();
        }

        function updateQuestion(question) {
            var target = '[es-id="question-editor-' + question.templateID + '-label"]';
            var label = UIUtils.jq(surveyPage.find(target)[0]);

            label.text(question.label.ptBR.plainText);
        }

        function loadQuestionWidget(question) {
            return WidgetService.getWidgetForModel(question);
        }

        function loadMetadataWidget(question) {
            return WidgetService.getMetadataWidget(question);
        }

        function loadEditorWidget(questionWidget, metadataWidget) {
            return WidgetService.getQuestionEditorWidget(questionWidget, metadataWidget);
        }

        function mergeScopeData(editorWidget) {
            scope.widgetTemplateList = scope.widgetTemplateList || {};
            scope.widget = editorWidget;
            scope.widgetTemplateList[editorWidget.questionId] = editorWidget.questionTemplate;
            scope.widgetMetadata = editorWidget.metadataTemplate;
        }

        function loadTemplate() {
            TemplateLoaderService.load(mpath.getQuestionEditorWidgetPath(), scope, function(template) {
                scope.widget.template = template;
                surveyPage.append(scope.widget.template);
            });
        }
    }

}());
