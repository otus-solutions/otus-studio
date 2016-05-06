(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('RemoveAnswerOptionEventFactory', RemoveAnswerOptionEventFactory);

    RemoveAnswerOptionEventFactory.$inject = [
        'RemoveAnswerOptionService',
        'WorkspaceService'
    ];

    function RemoveAnswerOptionEventFactory(RemoveAnswerOptionService, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new RemoveAnswerOptionEvent(RemoveAnswerOptionService, WorkspaceService);
        }

        return self;
    }

    function RemoveAnswerOptionEvent(RemoveAnswerOptionService, WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(eventSource) {
            RemoveAnswerOptionService.execute(eventSource.question);
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());
