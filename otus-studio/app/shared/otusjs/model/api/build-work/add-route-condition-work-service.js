(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .service('AddRouteConditionService', AddRouteConditionService);

    AddRouteConditionService.$inject = [
        'WorkspaceService',
        'RouteConditionFactory'
    ];

    function AddRouteConditionService(WorkspaceService, RouteConditionFactory) {
        var self = this;

        self.execute = execute;

        function execute(conditionName, route) {
            var routeCondition = RouteConditionFactory.create(conditionName);
            route.addCondition(routeCondition);
            return routeCondition;
        }
    }

}());
