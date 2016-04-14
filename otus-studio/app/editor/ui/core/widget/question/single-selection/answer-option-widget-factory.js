(function() {
    'use strict';

    angular
        .module('editor.ui')
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
        var self = this;

        self.model = model;
        self.value = model.value;
        self.esId = 'single-selection-' + model.parentQuestionID + '-option-' + model.value;
        self.esTarget = 'survey.question.' + model.parentQuestionID + '.option.' + model.value;
        self.addButtonTarget = 'survey.question.' + model.parentQuestionID + '.option.';
        self.removeButtonTarget = 'survey.question.' + model.parentQuestionID + '.option.' + model.value;
    }

}());
