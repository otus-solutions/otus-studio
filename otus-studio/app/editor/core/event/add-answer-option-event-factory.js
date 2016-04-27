(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('AddAnswerOptionEventFactory', AddAnswerOptionEventFactory);

    AddAnswerOptionEventFactory.$inject = [
        'AddAnswerOptionService',
        'WorkspaceService',
        'QuestionAnswerOptionEditorWidgetFactory'
    ];

    function AddAnswerOptionEventFactory(AddAnswerOptionService, WorkspaceService, QuestionAnswerOptionEditorWidgetFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new AddAnswerOptionEvent(AddAnswerOptionService, WorkspaceService, QuestionAnswerOptionEditorWidgetFactory);
        }

        return self;
    }

    function AddAnswerOptionEvent(AddAnswerOptionService, WorkspaceService, QuestionAnswerOptionEditorWidgetFactory) {
        var self = this;

        self.execute = execute;

        function execute(eventSource) {
            var questionWidget = eventSource.parentWidget;
            var option = AddAnswerOptionService.execute(eventSource);
            var optionWidget = QuestionAnswerOptionEditorWidgetFactory.create(option, questionWidget);
            questionWidget.options.push(optionWidget);
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());
