(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('TextItemWidgetFactory', TextItemWidgetFactory);

    function TextItemWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope) {
            return new TextItemWidget(scope);
        }

        return self;
    }

    function TextItemWidget(scope) {
        var self = this;

        self.name = 'TextItem';
        self.getParent = getParent;
        self.item = getItem();
        self.getTemplate = getTemplate;

        function getParent() {
            return scope.$parent.widget;
        }

        function getItem() {
            return getParent().getItem();
        }

        function getTemplate() {
            return '<text-item></text-item>';
        }
    }

}());
