(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('QuestionEditorWidgetFactory', QuestionEditorWidgetFactory);

    QuestionEditorWidgetFactory.$inject = [
        'RemoveQuestionEventFactory'
    ];

    function QuestionEditorWidgetFactory(RemoveQuestionEventFactory, SheetContentService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(question) {
            return new QuestionEditorWidget(question, RemoveQuestionEventFactory, SheetContentService);
        }

        return self;
    }

    function QuestionEditorWidget(question, RemoveQuestionEventFactory, SheetContentService) {
        var self = this;

        self.question = question;

        /* Public methods */
        self.deleteQuestion = deleteQuestion;

        function deleteQuestion() {
            RemoveQuestionEventFactory.create().execute(self.question);
            // SheetContentService.unloadQuestion(self.question);
        }
    }

}());
