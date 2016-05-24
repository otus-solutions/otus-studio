(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('DecimalQuestionWidgetFactory', DecimalQuestionWidgetFactory);

    function DecimalQuestionWidgetFactory() {
        var self = this;

        self.create = create;

        function create(parentWidget) {
            return new DecimalQuestionWidget(parentWidget);
        }

        return self;
    }

    function DecimalQuestionWidget(parentWidget) {
        var self = this;

        self.name = 'DecimalQuestion';
        self.parentWidget = parentWidget;
        self.question = parentWidget.question;
        self.template = '<decimal-question></decimal-question>';
    }

}());
