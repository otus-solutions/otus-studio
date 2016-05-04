(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .service('AddRuleService', AddRuleService);

    AddRuleService.$inject = [
        'WorkspaceService',
        'RuleFactory',
        'RouteConditionFactory'
    ];

    function AddRuleService(WorkspaceService, RuleFactory, RouteConditionFactory) {
        var self = this;

        self.execute = execute;

        function execute(eventSource) {
            var rule = RuleFactory.create(eventSource.when(), eventSource.operator(), eventSource.answer());

            if (eventSource.route.getConditionSetSize() === 0) {
                var newCondition = RouteConditionFactory.create('Condição');
                eventSource.route.addCondition(newCondition);
            }
            eventSource.route.getConditionSet()[0].addRule(rule);

            return rule;
        }
    }

}());
