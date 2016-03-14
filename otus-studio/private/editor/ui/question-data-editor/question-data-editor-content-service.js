(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('QuestionDataEditorContentService', QuestionDataEditorContentService);

    function QuestionDataEditorContentService() {
        var self = this,
            scope = null,
            dataEditor = null,
            widget = null;

        /* Public interface */
        self.init = init;
        self.loadQuestion = loadQuestion;
        self.showEditor = showEditor;
        self.hideEditor = hideEditor;

        function init(scopeReference, dataEditorReference) {
            scope = scopeReference;
            dataEditor = dataEditorReference;
            hideEditor();
        }

        function loadQuestion(question) {
            console.log(question);
        }

        function showEditor() {
            dataEditor.show();
        }

        function hideEditor() {
            dataEditor.hide();
        }
    }

}());
