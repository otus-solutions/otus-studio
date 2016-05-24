(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('DecimalQuestionWidgetFactory', DecimalQuestionWidgetFactory);

    function DecimalQuestionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new DecimalQuestionWidget(scope, element);
        }

        return self;
    }

    function DecimalQuestionWidget(scope, element) {
        var self = this;

        /* Public methods */
        self.getClassName = getClassName;
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;
        self.getTemplate = getTemplate;

        function getClassName() {
            return 'DecimalQuestionWidget';
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
            return '<otus-decimal-question></otus-decimal-question>';
        }
    }

}());
