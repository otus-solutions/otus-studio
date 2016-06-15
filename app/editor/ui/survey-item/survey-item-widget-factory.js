(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('SurveyItemWidgetFactory', SurveyItemWidgetFactory);

    SurveyItemWidgetFactory.$inject = [
        /* Question items */
        'CalendarQuestionWidgetFactory',
        'IntegerQuestionWidgetFactory',
        'DecimalQuestionWidgetFactory',
        'SingleSelectionQuestionWidgetFactory',
        'CheckboxQuestionWidgetFactory',
        'TextQuestionWidgetFactory',
        'TimeQuestionWidgetFactory',
        'EmailQuestionWidgetFactory',
        'PhoneQuestionWidgetFactory',
        /* Miscelaneous items */
        'TextItemWidgetFactory',
        'ImageItemWidgetFactory'
    ];

    function SurveyItemWidgetFactory(CalendarQuestionWidgetFactory, IntegerQuestionWidgetFactory, DecimalQuestionWidgetFactory, SingleSelectionQuestionWidgetFactory, CheckboxQuestionWidgetFactory, TextQuestionWidgetFactory, TimeQuestionWidgetFactory, EmailQuestionWidgetFactory, PhoneQuestionWidgetFactory, TextItemWidgetFactory, ImageItemWidgetFactory) {
        var self = this;

        var widgetFactories = {
            'CalendarQuestion': CalendarQuestionWidgetFactory,
            'IntegerQuestion': IntegerQuestionWidgetFactory,
            'DecimalQuestion': DecimalQuestionWidgetFactory,
            'SingleSelectionQuestion': SingleSelectionQuestionWidgetFactory,
            'CheckboxQuestion': CheckboxQuestionWidgetFactory,
            'TextQuestion': TextQuestionWidgetFactory,
            'TimeQuestion': TimeQuestionWidgetFactory,
            'EmailQuestion': EmailQuestionWidgetFactory,
            'PhoneQuestion': PhoneQuestionWidgetFactory,
            'TextItem': TextItemWidgetFactory,
            'ImageItem': ImageItemWidgetFactory
        };

        /* Public interface */
        self.create = create;

        function create(scope, element, item) {
            return widgetFactories[item.objectType].create(scope, element, item);
        }

        return self;
    }

}());
