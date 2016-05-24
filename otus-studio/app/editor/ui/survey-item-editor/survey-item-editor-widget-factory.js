(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('SurveyItemEditorWidgetFactory', SurveyItemEditorWidgetFactory);

    SurveyItemEditorWidgetFactory.$inject = [
        'RemoveSurveyItemEventFactory'
    ];

    function SurveyItemEditorWidgetFactory(RemoveSurveyItemEventFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element, item) {
            return new QuestionEditorWidget(scope, element, item, RemoveSurveyItemEventFactory);
        }

        return self;
    }

    function QuestionEditorWidget(scope, element, item, RemoveSurveyItemEventFactory) {
        var self = this;

        self.className = 'QuestionEditorWidget';

        /* Public methods */
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;
        self.getContainer = getContainer;
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

        function getItem() {
            return item;
        }

        function getContainer() {
            if(item.isQuestion()) {
                return '<otus:question-item></otus:question-item>';
            } else {
                return '<otus:misc-item></otus:misc-item>';
            }
        }

        function deleteQuestion() {
            RemoveSurveyItemEventFactory.create().execute(item);
            element.remove();
        }
    }

}());
