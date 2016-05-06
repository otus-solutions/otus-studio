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

        function execute(eventSource) {
            var navigationWidget = eventSource.parent;
            RemoveRouteService.execute(eventSource.routeData);

            navigationWidget.removeRoute(eventSource.routeData.name);

            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());
