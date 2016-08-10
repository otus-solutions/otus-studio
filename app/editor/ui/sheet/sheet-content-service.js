(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('SheetContentService', SheetContentService);

    SheetContentService.$inject = [
        'TemplateLoaderService',
        'PageAnchorService'
    ];

    function SheetContentService(TemplateLoaderService, PageAnchorService, $q, $timeout) {
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

        function loadQuestion(item) {
            self.lastLoadedQuestion = item;
            var content = TemplateLoaderService.loadDirective('<otus:survey-item-editor></otus:survey-item-editor>', scope);
            var sheetTemplate = sheet.find('#sheet').append(content);
            PageAnchorService.sheetAutoFocus(sheetTemplate);
        }

        function loadItem(item) {
            self.lastLoadedQuestion = item;
            var content = TemplateLoaderService.loadDirective('<otus:page-item-editor></otus:page-item-editor>', scope);
            sheet.find('#sheet').append(content);
            PageAnchorService.sheetAutoFocus(sheetTemplate);
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
