(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MetadataOptionWidgetFactory', MetadataOptionWidgetFactory);

    function MetadataOptionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(option, parentGroup) {
            return new MetadataAnswerOptionWidget(option, parentGroup);
        }

        return self;
    }

    function MetadataAnswerOptionWidget(option, parentGroup) {
        var self = this;

        self.name = 'MetadataAnswerOption';
        self.parentGroup = parentGroup;
        self.option = option;
    }

}());
