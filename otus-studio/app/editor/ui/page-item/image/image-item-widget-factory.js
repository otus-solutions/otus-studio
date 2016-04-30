(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('ImageItemWidgetFactory', ImageItemWidgetFactory);

    function ImageItemWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(parentWidget) {
            return new ImageItemWidget(parentWidget);
        }

        return self;
    }

    function ImageItemWidget(parentWidget) {
        var self = this;

        self.name = 'ImageItem';
        self.parentWidget = parentWidget;
        self.item = parentWidget.item;
        self.template = '<image-item></image-item>';
    }

}());
