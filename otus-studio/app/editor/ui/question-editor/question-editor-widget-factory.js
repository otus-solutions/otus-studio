(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('QuestionEditorWidgetFactory', QuestionEditorWidgetFactory);

    QuestionEditorWidgetFactory.$inject = [
        'RemoveQuestionEventFactory'
    ];

    function QuestionEditorWidgetFactory(RemoveQuestionEventFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(question, element) {
            return new QuestionEditorWidget(question, element, RemoveQuestionEventFactory);
        }

        return self;
    }

    function QuestionEditorWidget(question, element, RemoveQuestionEventFactory) {
        var self = this;

        self.question = question;
        self.element = element;

        /* Public methods */
        self.deleteQuestion = deleteQuestion;

        function deleteQuestion() {
            RemoveQuestionEventFactory.create().execute(self.question);
            element.remove();
        }
    }

}());
