(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MetadataAnswerOptionWidgetFactory', MetadataAnswerOptionWidgetFactory);

    function MetadataAnswerOptionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(option) {
            return new MetadataAnswerOptionWidget(option);
        }

        return self;
    }

    function MetadataAnswerOptionWidget(option) {
        var self = this;

        self.option = option;
    }

}());
