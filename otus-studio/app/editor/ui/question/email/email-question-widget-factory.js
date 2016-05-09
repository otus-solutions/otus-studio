(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('EmailQuestionWidgetFactory', TextQuestionWidgetFactory);

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

        self.name = 'EmailQuestion';
        self.parentWidget = parentWidget;
        self.question = parentWidget.question;
        self.template = '<email-question></email-question>';
    }

}());
