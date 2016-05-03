(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('PageItemWidgetFactory', PageItemWidgetFactory);

    PageItemWidgetFactory.$inject = [
        'TextItemWidgetFactory',
        'ImageItemWidgetFactory'
    ];

    function PageItemWidgetFactory(TextItemWidgetFactory, ImageItemWidgetFactory) {
        var self = this,

            widgetFactories = {
                'TextItem': TextItemWidgetFactory,
                'ImageItem': ImageItemWidgetFactory,
            };

        /* Public interface */
        self.create = create;

            function create(item) {
                var widget = new PageItemWidget(item);
                return widgetFactories[item.objectType].create(widget);
            }

        return self;
    }

    function PageItemWidget(item) {
        var self = this;

        self.name = 'PageItem';
        self.item = item;
    }

}());
