(function() {
    'use strict';

    angular
        .module('editor.engine.ui')
        .factory('SingleSelectionQuestionWidgetFactory', SingleSelectionQuestionWidgetFactory);

    function SingleSelectionQuestionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(model) {
            return new SingleSelectionQuestionWidget(model);
        }

        return self;
    }

    function SingleSelectionQuestionWidget(model) {
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
