(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('UpdateQuestionEventFactory', UpdateQuestionEventFactory);

    UpdateQuestionEventFactory.$inject = [
        'WorkspaceService'
    ];

    function UpdateQuestionEventFactory(WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new UpdateQuestionEvent(WorkspaceService);
        }

        return self;
    }

    function UpdateQuestionEvent(WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(data) {
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());
