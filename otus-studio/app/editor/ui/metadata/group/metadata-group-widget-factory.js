(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MetadataGroupWidgetFactory', MetadataGroupWidgetFactory);

    function MetadataGroupWidgetFactory() {
        var self = this;

        /*Public interface*/
        self.create = create;

        function create(parentWidget) {
            return new MetadataGroupWidget(parentWidget);
        }

        return self;
    }

    function MetadataGroupWidget(parentWidget) {
        var self = this;

        self.name = 'MetadataGroup';
        self.parentWidget = parentWidget;
        self.question = parentWidget.question;
        self.options = [];

        self.removeLastOption = removeLastOption;

        function removeLastOption() {
            self.options.splice(-1);
        }
    }

}());
