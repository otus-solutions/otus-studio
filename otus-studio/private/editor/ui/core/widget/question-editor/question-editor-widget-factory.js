(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('QuestionEditorWidgetFactory', QuestionEditorWidgetFactory);

    function QuestionEditorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(questionWidget) {
            return new QuestionEditorWidget(questionWidget);
        }

        return self;
    }

    function QuestionEditorWidget(questionWidget) {
        Object.defineProperty(this, 'questionWidget', {
            value: questionWidget,
            writable: false
        });

        Object.defineProperty(this, 'title', {
            value: questionWidget.questionId + ':' + questionWidget.type,
            writable: false
        });

        Object.defineProperty(this, 'questionId', {
            value: questionWidget.questionId,
            writable: false
        });

        Object.defineProperty(this, 'labelTarget', {
            value: 'survey.question.' + questionWidget.questionId + '.label',
            writable: false
        });

        Object.defineProperty(this, 'unitTarget', {
            value: 'survey.question.' + questionWidget.questionId + '.unit',
            writable: false
        });

        Object.defineProperty(this, 'questionTarget', {
            value: 'survey.question.' + questionWidget.questionId,
            writable: false
        });

        Object.defineProperty(this, 'questionTemplate', {
            value: questionWidget.template,
            writable: false
        });
    }

}());
