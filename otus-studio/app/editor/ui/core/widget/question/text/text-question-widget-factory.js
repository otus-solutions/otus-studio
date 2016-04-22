(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('TextQuestionWidgetFactory', TextQuestionWidgetFactory);

    function TextQuestionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(widget) {
            return new TextQuestionWidget(widget);
        }

        return self;
    }

    function TextQuestionWidget(widget) {
        var self = this;

        self.widget = widget;
        self.widget.template = '<text-question></text-question>';
        self.widget.metadata = '<metadata-question></metadata-question>';
    }

}());
