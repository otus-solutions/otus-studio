(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('UpdateRuleEventFactory', UpdateRuleEventFactory);

    UpdateRuleEventFactory.$inject = [
        'WorkspaceService'
    ];

    function UpdateRuleEventFactory(WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new UpdateRuleEvent(WorkspaceService);
        }

        return self;
    }

    function UpdateRuleEvent(WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(eventSource) {
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());
