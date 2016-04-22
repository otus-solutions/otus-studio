(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('AddQuestionEventFactory', AddQuestionEventFactory);

    AddQuestionEventFactory.$inject = [
        'AddQuestionService',
        'SurveyPageContentService',
        'WorkspaceService'
    ];

    function AddQuestionEventFactory(AddQuestionService, SurveyPageContentService, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new AddQuestionEvent(AddQuestionService, SurveyPageContentService, WorkspaceService);
        }

        return self;
    }

    function AddQuestionEvent(AddQuestionService, SurveyPageContentService, WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(data) {
            var question = AddQuestionService.execute(data);
            SurveyPageContentService.loadQuestion(question);
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());
