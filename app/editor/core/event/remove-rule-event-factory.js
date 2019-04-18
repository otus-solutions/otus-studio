//interation 134 - we did not find any injection of this factory
(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('RemoveRuleEventFactory', RemoveRuleEventFactory);

    RemoveRuleEventFactory.$inject = [
        'RemoveRuleService',
        'WorkspaceService'
    ];

    function RemoveRuleEventFactory(RemoveRuleService, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new RemoveRuleEvent(RemoveRuleService, WorkspaceService);
        }

        return self;
    }

    function RemoveRuleEvent(RemoveRuleService, WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(rule, route) {
            RemoveRuleService.execute(rule, route);
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());
