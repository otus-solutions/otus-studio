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

        function create(scope, element, question) {
            return new QuestionEditorWidget(scope, element, question, RemoveQuestionEventFactory);
        }

        return self;
    }

    function QuestionEditorWidget(scope, element, question, RemoveQuestionEventFactory) {
        var self = this;

        /* Instance definitions */
        self.element = element;
        self.uuid = scope.uuid;
        self.question = question;

        /* Public methods */
        self.deleteQuestion = deleteQuestion;

        function deleteQuestion() {
            RemoveQuestionEventFactory.create().execute(self.question);
            element.remove();
            scope.$root.$broadcast('questionEditorWidget.delete.' + self.question.templateID);
        }
    }

}());
