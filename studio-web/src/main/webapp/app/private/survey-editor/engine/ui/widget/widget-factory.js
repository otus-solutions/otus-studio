(function() {
    'use strict';

    angular
        .module('editor.engine.ui')
        .factory('WidgetFactory', WidgetFactory);

    WidgetFactory.$inject = [
        'CalendarQuestionWidgetFactory',
        'NumericQuestionWidgetFactory',
        'SingleSelectionQuestionWidgetFactory',
        'TextQuestionWidgetFactory',
        'TimeQuestionWidgetFactory'
    ];

    function WidgetFactory(CalendarQuestionWidgetFactory, NumericQuestionWidgetFactory, SingleSelectionQuestionWidgetFactory, TextQuestionWidgetFactory, TimeQuestionWidgetFactory) {
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
            return widgetFactories[model.objectType].create(model);
        }

        return self;
    }

}());
