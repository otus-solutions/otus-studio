(function() {
    'use strict';

    angular
        .module('editor.engine.ui')
        .factory('CalendarQuestionWidgetFactory', CalendarQuestionWidgetFactory);

    function CalendarQuestionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(model) {
            return new CalendarQuestionWidget(model);
        }

        return self;
    }

    function CalendarQuestionWidget(model) {
        var self = this;

        Object.defineProperty(this, 'model', {
            value: model,
            writable: false
        });

        Object.defineProperty(this, 'type', {
            value: model.objectType,
            writable: false
        });
    }

}());
