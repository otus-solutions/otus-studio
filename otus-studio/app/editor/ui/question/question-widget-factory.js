(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('QuestionWidgetFactory', QuestionWidgetFactory);

    QuestionWidgetFactory.$inject = [
        'CalendarQuestionWidgetFactory',
        'NumericQuestionWidgetFactory',
        'SingleSelectionQuestionWidgetFactory',
        'TextQuestionWidgetFactory',
        'TimeQuestionWidgetFactory',
    ];

    function QuestionWidgetFactory(CalendarQuestionWidgetFactory, NumericQuestionWidgetFactory, SingleSelectionQuestionWidgetFactory, TextQuestionWidgetFactory, TimeQuestionWidgetFactory) {
        var self = this,

            widgetFactories = {
                'CalendarQuestion': CalendarQuestionWidgetFactory,
                'NumericQuestion': NumericQuestionWidgetFactory,
                'SingleSelectionQuestion': SingleSelectionQuestionWidgetFactory,
                'TextQuestion': TextQuestionWidgetFactory,
                'TimeQuestion': TimeQuestionWidgetFactory,
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

        self.name = 'Question';
        self.question = question;
    }

}());
