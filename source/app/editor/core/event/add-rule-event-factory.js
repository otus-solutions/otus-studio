//interation 134 - we did not find any injection of this factory
(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('AddRuleEventFactory', AddRuleEventFactory);

    AddRuleEventFactory.$inject = [
        'AddRuleService',
        'WorkspaceService'
    ];

    function AddRuleEventFactory(AddRuleService, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new AddRuleEvent(AddRuleService, WorkspaceService);
        }

        return self;
    }

    function AddRuleEvent(AddRuleService, WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(ruleData, route) {
            var rule = AddRuleService.execute(ruleData, route);

            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();

            return rule;
        }
    }

}());
