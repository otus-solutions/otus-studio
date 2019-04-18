//interation 134 - we did not find any injection of this factory
(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('RemoveRouteEventFactory', RemoveRouteEventFactory);

    RemoveRouteEventFactory.$inject = [
        'RemoveRouteService',
        'WorkspaceService'
    ];

    function RemoveRouteEventFactory(RemoveRouteService, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new RemoveRouteEvent(RemoveRouteService, WorkspaceService);
        }

        return self;
    }

    function RemoveRouteEvent(RemoveRouteService, WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(routeData) {
            RemoveRouteService.execute(routeData);
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());
