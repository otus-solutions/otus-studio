(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('NumericQuestionWidgetFactory', NumericQuestionWidgetFactory);

    function NumericQuestionWidgetFactory() {
        var self = this;

        self.create = create;

        function create(parentWidget) {
            return new NumericQuestionWidget(parentWidget);
        }

        return self;
    }

    function NumericQuestionWidget(parentWidget) {
        var self = this;

        self.name = 'NumericQuestion';
        self.parentWidget = parentWidget;
        self.question = parentWidget.question;
        self.template = '<numeric-question></numeric-question>';
    }

}());
