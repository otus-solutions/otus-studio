(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .service('AddRuleService', AddRuleService);

    AddRuleService.$inject = [
        'WorkspaceService',
        'RuleFactory'
    ];

    function AddRuleService(WorkspaceService, RuleFactory) {
        var self = this;

        self.execute = execute;

        function execute(eventSource) {
            var rule = RuleFactory.create(eventSource.when(), eventSource.operator(), eventSource.answer());

            var route = eventSource.route;
            route.addRule(rule);

            return rule;
        }
    }

}());
