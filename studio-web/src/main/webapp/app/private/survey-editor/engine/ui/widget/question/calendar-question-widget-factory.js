(function() {
    'use strict';

    angular
        .module('editor.engine.ui')
        .factory('CalendarQuestionWidgetFactory', CalendarQuestionWidgetFactory);

    function CalendarQuestionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(prototype) {
            return new CalendarQuestionWidget(prototype);
        }

        return self;
    }

    function CalendarQuestionWidget(prototype) {
        Object.defineProperty(this, 'model', {
            value: prototype.model,
            writable: false
        });

        Object.defineProperty(this, 'questionId', {
            value: prototype.questionId,
            writable: false
        });

        Object.defineProperty(this, 'type', {
            value: prototype.type,
            writable: false
        });
    }

}());
