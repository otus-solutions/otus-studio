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
        'TimeQuestionWidgetFactory'
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

        function create(model) {
            var widget = new QuestionWidget(model);
            return widgetFactories[model.objectType].create(widget);
        }

        return self;
    }

    function QuestionWidget(model) {
        Object.defineProperty(this, 'model', {
            value: model,
            writable: false
        });

        Object.defineProperty(this, 'questionId', {
            value: model.oid
        });

        Object.defineProperty(this, 'type', {
            value: model.objectType,
            writable: false
        });

        Object.defineProperty(this, 'label', {
            value: model.label.ptBR.plainText
        });
    }

}());
