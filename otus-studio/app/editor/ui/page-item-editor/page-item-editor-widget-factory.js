(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('PageItemEditorWidgetFactory', PageItemEditorWidgetFactory);

    function PageItemEditorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(item) {
            return new PageItemEditorWidget(item);
        }

        return self;
    }

    function PageItemEditorWidget(item) {
        var self = this;

        self.item = item;
        self.header = item.templateID;
    }

}());
