(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MetadataOptionWidgetFactory', MetadataOptionWidgetFactory);

    function MetadataOptionWidgetFactory() {
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

        self.name = 'MetadataAnswerOption';

        self.option = option;
    }

}());
