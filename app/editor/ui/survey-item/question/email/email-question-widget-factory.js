(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('EmailQuestionWidgetFactory', EmailQuestionWidgetFactory);

    function EmailQuestionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new EmailQuestionWidget(scope, element);
        }

        return self;
    }

    function EmailQuestionWidget(scope, element) {
        var self = this;

        /* Public methods */
        self.getClassName = getClassName;
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;
        self.getTemplate = getTemplate;

        function getClassName() {
            return 'EmailQuestionWidget';
        }

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
            return getParent().getItem();
        }

        function getTemplate() {
            return '<otus-email-question></otus-email-question>';
        }
    }

}());
