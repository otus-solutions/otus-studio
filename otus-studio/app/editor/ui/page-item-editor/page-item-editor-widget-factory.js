(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('PageItemEditorWidgetFactory', PageItemEditorWidgetFactory);

    PageItemEditorWidgetFactory.$inject = [
        'RemoveQuestionEventFactory',
        'SheetContentService'
    ];

    function PageItemEditorWidgetFactory(RemoveQuestionEventFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(item, element) {
            return new PageItemEditorWidget(item, element, RemoveQuestionEventFactory);
        }

        return self;
    }

    function PageItemEditorWidget(item, element, RemoveQuestionEventFactory) {
        var self = this;

        self.item = item;
        self.element = element;

        /* Public methods */
        self.deleteItem = deleteItem;

        function deleteItem() {
            RemoveQuestionEventFactory.create().execute(self.item);
            element.remove();
        }
    }

}());
