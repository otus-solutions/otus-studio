(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('SheetContentService', SheetContentService);

    SheetContentService.$inject = [
        'editor.ui.mpath',
        'TemplateLoaderService',
        'WidgetService'
    ];

    function SheetContentService(mpath, TemplateLoaderService, WidgetService) {
        var self = this;
        var scope = null;
        var sheet = null;

        /* Public interface */
        self.init = init;
        self.loadQuestion = loadQuestion;
        self.loadItem = loadItem;
        self.unloadQuestion = unloadQuestion;
        self.updateQuestion = updateQuestion;

        function init(scopeReference, sheetReference) {
            scope = scopeReference;
            sheet = sheetReference;
        }

        function loadQuestion(question) {
            self.lastLoadedQuestion = question;
            scope.widget = WidgetService.getQuestionEditorWidget(question);
            var content = TemplateLoaderService.loadDirective('<otus:question-editor></otus:question-editor>', scope);
            sheet.find('#sheet').append(content);
        }

        function loadItem(item) {
            self.lastLoadedQuestion = item;
            scope.widget = WidgetService.getPageItemEditorWidget(item);
            var content = TemplateLoaderService.loadDirective('<otus:page-item-editor></otus:page-item-editor>', scope);
            sheet.find('#sheet').append(content);
        }

        function unloadQuestion(question) {
            sheet.find('[question-target="' + question.templateID + '"]').remove();
        }

        function updateQuestion(question) {
            var target = '[es-id="question-editor-' + question.templateID + '-label"]';
            var label = UIUtils.jq(sheet.find(target)[0]);

            label.text(question.label.ptBR.plainText);
        }
    }

}());
