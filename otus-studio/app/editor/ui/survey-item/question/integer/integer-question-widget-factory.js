(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('IntegerQuestionWidgetFactory', IntegerQuestionWidgetFactory);

    function IntegerQuestionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new IntegerQuestionWidget(scope, element);
        }

        return self;
    }

    function IntegerQuestionWidget(scope, element) {
        var self = this;

        /* Public methods */
        self.getClassName = getClassName;
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;
        self.getTemplate = getTemplate;

        function getClassName() {
            return 'IntegerQuestionWidget';
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
            return '<otus-integer-question></otus-integer-question>';
        }
    }

}());
