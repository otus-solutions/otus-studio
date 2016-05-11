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

        function execute(ruleData, route) {
            var newRule = RuleFactory.create(ruleData.when, ruleData.operator, ruleData.answer);
            route.conditionSet[0].addRule(newRule);
            return newRule;
        }
    }

}());
