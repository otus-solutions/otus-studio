(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('IntegerQuestionWidgetFactory', IntegerQuestionWidgetFactory);

    function IntegerQuestionWidgetFactory() {
        var self = this;

        self.create = create;

        function create(parentWidget) {
            return new IntegerQuestionWidget(parentWidget);
        }

        return self;
    }

    function IntegerQuestionWidget(parentWidget) {
        var self = this;

        self.name = 'IntegerQuestion';
        self.parentWidget = parentWidget;
        self.question = parentWidget.question;
        self.template = '<integer-question></integer-question>';
    }

}());
