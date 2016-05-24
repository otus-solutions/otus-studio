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

        self.className = 'QuestionEditorWidget';

        /* Public methods */
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getQuestion = getQuestion;
        self.deleteQuestion = deleteQuestion;

        function getUUID() {
            return scope.uuid;
        }

        function getElement() {
            return element;
        }

        function getParent() {
            return scope.$parent.widget;
        }

        function getQuestion() {
            return question;
        }

        function deleteQuestion() {
            RemoveQuestionEventFactory.create().execute(question);
            element.remove();
        }
    }

}());
