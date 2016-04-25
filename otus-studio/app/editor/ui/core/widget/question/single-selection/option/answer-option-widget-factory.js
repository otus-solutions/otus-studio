(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('QuestionAnswerOptionEditorWidgetFactory', QuestionAnswerOptionEditorWidgetFactory);

    function QuestionAnswerOptionEditorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(option) {
            return new QuestionAnswerOptionEditorWidget(option);
        }

        return self;
    }

    function QuestionAnswerOptionEditorWidget(option) {
        var self = this;

        self.name = 'AnswerOption';
        self.option = option;
    }

}());
