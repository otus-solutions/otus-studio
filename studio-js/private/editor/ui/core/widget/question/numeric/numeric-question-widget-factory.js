(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('NumericQuestionWidgetFactory', NumericQuestionWidgetFactory);

    function NumericQuestionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(prototype) {
            return new NumericQuestionWidget(prototype);
        }

        return self;
    }

    function NumericQuestionWidget(prototype) {
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
