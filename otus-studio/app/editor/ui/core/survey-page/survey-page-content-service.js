(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('SurveyPageContentService', SurveyPageContentService);

    SurveyPageContentService.$inject = [
        'editor.ui.mpath',
        'TemplateLoaderService',
        'WidgetService'
    ];

    function SurveyPageContentService(mpath, TemplateLoaderService, WidgetService) {
        var self = this;
        var scope = null;
        var surveyPage = null;

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
            self.lastLoadedQuestion = question;
            scope.widget = loadEditorWidget();
            var content = TemplateLoaderService.loadDirective('<otus:question-editor></otus:question-editor>', scope);
            surveyPage.append(content);
        }

        function loadEditorWidget(questionWidget, metadataWidget) {
            return WidgetService.getQuestionEditorWidget(questionWidget, metadataWidget);
        }

        function unloadQuestion(question) {
            surveyPage.find('[question-target="' + question.templateID + '"]').remove();
        }

        function updateQuestion(question) {
            var target = '[es-id="question-editor-' + question.templateID + '-label"]';
            var label = UIUtils.jq(surveyPage.find(target)[0]);

            label.text(question.label.ptBR.plainText);
        }
    }

}());
