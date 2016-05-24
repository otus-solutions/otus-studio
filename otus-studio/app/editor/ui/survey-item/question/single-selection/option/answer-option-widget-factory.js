(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('AnswerOptionWidgetFactory', AnswerOptionWidgetFactory);

    function AnswerOptionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element, option) {
            return new AnswerOptionWidget(scope, element, option);
        }

        return self;
    }

    function AnswerOptionWidget(scope, element, option) {
        var self = this;

        /* Public methods */
        self.getClassName = getClassName;
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;

        function getClassName() {
            return 'AnswerOptionWidget';
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
            return option;
        }
    }

}());
