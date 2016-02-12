(function() {
    'use strict';

    angular
        .module('editor.engine.ui')
        .factory('NumericQuestionWidgetFactory', NumericQuestionWidgetFactory);

    function NumericQuestionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(model) {
            return new NumericQuestionWidget(model);
        }

        return self;
    }

    function NumericQuestionWidget(model) {
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
