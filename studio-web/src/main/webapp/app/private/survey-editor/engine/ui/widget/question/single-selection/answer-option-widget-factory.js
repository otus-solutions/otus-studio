(function() {
    'use strict';

    angular
        .module('editor.engine.ui')
        .factory('QuestionAnswerOptionEditorWidgetFactory', QuestionAnswerOptionEditorWidgetFactory);

    function QuestionAnswerOptionEditorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(model) {
            return new QuestionAnswerOptionEditorWidget(model);
        }

        return self;
    }

    function QuestionAnswerOptionEditorWidget(model) {
        console.log(model);
        Object.defineProperty(this, 'model', {
            value: model,
            writable: false
        });

        Object.defineProperty(this, 'optionIndex', {
            value: model.oid,
            writable: false
        });
    }

}());
