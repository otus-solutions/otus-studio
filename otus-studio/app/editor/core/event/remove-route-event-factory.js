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
            var navigationWidget = eventSource.parentWidget.parentWidget;
            RemoveRouteService.execute(navigationWidget.navigation, eventSource.model);

            navigationWidget.removeRoute(eventSource.model.name);

            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());
