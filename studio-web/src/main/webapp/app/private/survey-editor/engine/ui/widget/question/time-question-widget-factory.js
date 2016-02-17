(function() {
    'use strict';

    angular
        .module('editor.engine.ui')
        .factory('TimeQuestionWidgetFactory', TimeQuestionWidgetFactory);

    function TimeQuestionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(model) {
            return new TimeQuestionWidget(model);
        }

        return self;
    }

    function TimeQuestionWidget(model) {
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
