(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('PhoneQuestionWidgetFactory', PhoneQuestionWidgetFactory);

    function PhoneQuestionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(parentWidget) {
            return new PhoneQuestionWidget(parentWidget);
        }

        return self;
    }

    function PhoneQuestionWidget(parentWidget) {
        var self = this;

        self.name = 'PhoneQuestion';
        self.parentWidget = parentWidget;
        self.question = parentWidget.question;
        self.template = '<phone-question></phone-question>';
    }

}());
