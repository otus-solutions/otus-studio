//interation 134 - we did not find any injection of this factory
(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('AddRouteConditionEventFactory', AddRouteConditionEventFactory);

    AddRouteConditionEventFactory.$inject = [
        'AddRouteConditionService',
        'WorkspaceService'
    ];

    function AddRouteConditionEventFactory(AddRouteConditionService, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new AddRouteConditionEvent(AddRouteConditionService, WorkspaceService);
        }

        return self;
    }

    function AddRouteConditionEvent(AddRouteConditionService, WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(conditionName, route) {
            var routeCondition = AddRouteConditionService.execute(conditionName, route);

            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();

            return routeCondition;
        }
    }

}());
