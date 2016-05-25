(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('TextItemWidgetFactory', TextItemWidgetFactory);

    function TextItemWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(parentWidget) {
            return new TextItemWidget(parentWidget);
        }

        return self;
    }

    function TextItemWidget(parentWidget) {
        var self = this;

        self.name = 'TextItem';
        self.parentWidget = parentWidget;
        self.item = parentWidget.item;
        self.template = '<text-item></text-item>';
    }

}());
