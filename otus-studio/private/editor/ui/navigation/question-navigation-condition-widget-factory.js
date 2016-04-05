(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('QuestionNavigationConditionWidgetFactory', QuestionNavigationConditionWidgetFactory);

    function QuestionNavigationConditionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(model) {
            return new QuestionNavigationConditionWidget(model);
        }

        return self;
    }

    function QuestionNavigationConditionWidget(model) {
        Object.defineProperty(this, 'when', {
            value: model.when,
            writable: false
        });

        Object.defineProperty(this, 'answer', {
            value: model.answer,
            writable: false
        });
    }

}());
