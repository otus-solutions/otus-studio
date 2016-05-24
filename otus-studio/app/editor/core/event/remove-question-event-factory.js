(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('RemoveQuestionEventFactory', RemoveQuestionEventFactory);

    RemoveQuestionEventFactory.$inject = [
        '$rootScope',
        'WorkspaceService',
        'RemoveQuestionService',
    ];

    function RemoveQuestionEventFactory($rootScope, WorkspaceService, RemoveQuestionService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new RemoveQuestionEvent($rootScope, WorkspaceService, RemoveQuestionService);
        }

        return self;
    }

    function RemoveQuestionEvent($rootScope, WorkspaceService, RemoveQuestionService) {
        var self = this;

        self.execute = execute;

        function execute(question) {
            RemoveQuestionService.execute(question, WorkspaceService.getSurvey());
            $rootScope.$broadcast('question.remove.' + question.templateID, question);
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());
