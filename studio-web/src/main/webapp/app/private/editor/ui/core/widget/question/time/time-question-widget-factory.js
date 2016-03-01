(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('TimeQuestionWidgetFactory', TimeQuestionWidgetFactory);

    function TimeQuestionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(prototype) {
            return new TimeQuestionWidget(prototype);
        }

        return self;
    }

    function TimeQuestionWidget(prototype) {
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
