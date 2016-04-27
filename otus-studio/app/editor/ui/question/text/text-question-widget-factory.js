(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('TextQuestionWidgetFactory', TextQuestionWidgetFactory);

    function TextQuestionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(parentWidget) {
            return new TextQuestionWidget(parentWidget);
        }

        return self;
    }

    function TextQuestionWidget(parentWidget) {
        var self = this;

        self.name = 'TextQuestion';
        self.parentWidget = parentWidget;
        self.question = parentWidget.question;
        self.template = '<text-question></text-question>';
    }

}());
