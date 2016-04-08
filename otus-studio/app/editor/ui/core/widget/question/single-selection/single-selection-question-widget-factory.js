(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('SingleSelectionQuestionWidgetFactory', SingleSelectionQuestionWidgetFactory);

    function SingleSelectionQuestionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(prototype) {
            return new SingleSelectionQuestionWidget(prototype);
        }

        return self;
    }

    function SingleSelectionQuestionWidget(prototype) {
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
