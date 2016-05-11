(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MetadataGroupWidgetFactory', MetadataGroupWidgetFactory);

    MetadataGroupWidgetFactory.$inject = [
        'MetadataOptionWidgetFactory',
        'AddMetadataAnswerEventFactory',
        'RemoveMetadataOptionEventFactory'
    ];

    function MetadataGroupWidgetFactory(MetadataOptionWidgetFactory, AddMetadataAnswerEventFactory, RemoveMetadataOptionEventFactory) {
        var self = this;

        /*Public interface*/
        self.create = create;

        function create(parentWidget) {
            return new MetadataGroupWidget(parentWidget, MetadataOptionWidgetFactory, AddMetadataAnswerEventFactory, RemoveMetadataOptionEventFactory);
        }

        return self;
    }

    function MetadataGroupWidget(parentWidget, MetadataOptionWidgetFactory, AddMetadataAnswerEventFactory, RemoveMetadataOptionEventFactory) {
        var self = this;

        /* Type definitions */
        self.className = self.constructor.name;
        self.css = {};

        /* Template definitions */

        /* Instance definitions */
        self.parent = parentWidget;
        self.question = parentWidget.question;
        self.options = [];

        /* Public methods */
        self.addOption = addOption;
        self.removeLastOption = removeLastOption;

        function addOption() {
            var newOption = AddMetadataAnswerEventFactory.create().execute(self);
            var optionWidget = MetadataOptionWidgetFactory.create(newOption, self);
            self.options.push(optionWidget);
        }

        function removeLastOption() {
            RemoveMetadataOptionEventFactory.create().execute(self);
            self.options.splice(-1);
        }
    }

}());
