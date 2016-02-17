(function() {
    'use strict';

    angular
        .module('editor.engine.ui')
        .factory('TextQuestionWidgetFactory', TextQuestionWidgetFactory);

    function TextQuestionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(model) {
            return new TextQuestionWidget(model);
        }

        return self;
    }

    function TextQuestionWidget(model) {
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
