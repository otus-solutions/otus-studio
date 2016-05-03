(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .factory('PageItemFactory', PageItemFactory);

    PageItemFactory.$inject = [
        'TextItemFactory',
        'ImageItemFactory'
    ];

    function PageItemFactory(TextItemFactory, ImageItemFactory) {
        var self = this,

            factoryMap = {
                'TextItem': TextItemFactory,
                'ImageItem': ImageItemFactory,
            };

        /* Public interface */
        self.create = create;

        function create(itemType, templateID) {
            var item = new PageItem(templateID);
            return factoryMap[itemType].create(templateID, item);
        }

        return self;
    }

    function PageItem(templateID) {
        var self = this;

        self.extents = 'StudioObject';
        self.objectType = 'PageItem';
        self.templateID = templateID;
    }

}());
