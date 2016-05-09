(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('RemoveQuestionEventFactory', RemoveQuestionEventFactory);

    RemoveQuestionEventFactory.$inject = [
        'RemoveQuestionService',
        'WorkspaceService'
    ];

    function RemoveQuestionEventFactory(RemoveQuestionService, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new RemoveQuestionEvent(RemoveQuestionService, WorkspaceService);
        }

        return self;
    }

    function RemoveQuestionEvent(RemoveQuestionService, WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(question) {
            RemoveQuestionService.execute(question, WorkspaceService.getSurvey());
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());
