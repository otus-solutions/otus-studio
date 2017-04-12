(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('ImageItemWidgetFactory', ImageItemWidgetFactory);

    function ImageItemWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope) {
            return new ImageItemWidget(scope);
        }

        return self;
    }

    function ImageItemWidget(scope) {
        var self = this;

        self.name = 'ImageItem';
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
            return '<image-item></image-item>';
        }
    }

}());
