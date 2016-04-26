(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('QuestionAnswerOptionEditorWidgetFactory', QuestionAnswerOptionEditorWidgetFactory);

    function QuestionAnswerOptionEditorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(option, parentWidget) {
            return new QuestionAnswerOptionEditorWidget(option, parentWidget);
        }

        return self;
    }

    function QuestionAnswerOptionEditorWidget(option, parentWidget) {
        var self = this;

        self.name = 'AnswerOption';
        self.parentWidget = parentWidget;
        self.option = option;
    }

}());
