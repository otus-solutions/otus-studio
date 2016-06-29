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
            return new SurveyItemEditorWidget(scope, element, item, RemoveSurveyItemEventFactory);
        }

        return self;
    }

    function SurveyItemEditorWidget(scope, element, item, RemoveSurveyItemEventFactory) {
        var self = this;

        self.className = 'SurveyItemEditorWidget';

        /* Public methods */
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;
        self.getContainer = getContainer;
        self.deleteSurveyItem = deleteSurveyItem;
        self.getQuestionId = getQuestionId;

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

        function getQuestionId(){
            return getItem().templateID;
        }

        function getContainer() {
            if(item.isQuestion()) {
                return '<otus:question-item></otus:question-item>';
            } else {
                return '<otus:misc-item></otus:misc-item>';
            }
        }

        function deleteSurveyItem() {
            RemoveSurveyItemEventFactory.create().execute(item);
            element.remove();
        }
    }

}());
