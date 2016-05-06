(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('QuestionWidgetFactory', QuestionWidgetFactory);

    QuestionWidgetFactory.$inject = [
        'CalendarQuestionWidgetFactory',
        'IntegerQuestionWidgetFactory',
        'DecimalQuestionWidgetFactory',
        'SingleSelectionQuestionWidgetFactory',
        'TextQuestionWidgetFactory',
        'TimeQuestionWidgetFactory',
        'PhoneQuestionWidgetFactory'
    ];

    function QuestionWidgetFactory(CalendarQuestionWidgetFactory, IntegerQuestionWidgetFactory, DecimalQuestionWidgetFactory, SingleSelectionQuestionWidgetFactory, TextQuestionWidgetFactory, TimeQuestionWidgetFactory, PhoneQuestionWidgetFactory) {
        var self = this,

            widgetFactories = {
                'CalendarQuestion': CalendarQuestionWidgetFactory,
                'IntegerQuestion': IntegerQuestionWidgetFactory,
                'DecimalQuestion': DecimalQuestionWidgetFactory,
                'SingleSelectionQuestion': SingleSelectionQuestionWidgetFactory,
                'TextQuestion': TextQuestionWidgetFactory,
                'TimeQuestion': TimeQuestionWidgetFactory,
                'PhoneQuestion': PhoneQuestionWidgetFactory
            };

        /* Public interface */
        self.create = create;

        function create(question) {
            var widget = new QuestionWidget(question);
            return widgetFactories[question.objectType].create(widget);
        }

        return self;
    }

    function QuestionWidget(question) {
        var self = this;

        self.className = self.constructor.name;
        self.question = question;
    }

}());
