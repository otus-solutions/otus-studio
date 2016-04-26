(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('CalendarQuestionWidgetFactory', CalendarQuestionWidgetFactory);

    function CalendarQuestionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(parentWidget) {
            return new CalendarQuestionWidget(parentWidget);
        }

        return self;
    }

    function CalendarQuestionWidget(parentWidget) {
        var self = this;

        self.name = 'CalendarQuestion';
        self.parentWidget = parentWidget;
        self.question = parentWidget.question;
        self.template = '<calendar-question></calendar-question>';
    }

}());
