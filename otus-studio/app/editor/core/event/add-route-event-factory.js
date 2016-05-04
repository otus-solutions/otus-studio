(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('AddRouteEventFactory', AddRouteEventFactory);

    AddRouteEventFactory.$inject = [
        'AddRouteService',
        'WorkspaceService'
    ];

    function AddRouteEventFactory(AddRouteService, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new AddRouteEvent(AddRouteService, WorkspaceService);
        }

        return self;
    }

    function AddRouteEvent(AddRouteService, WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(routeData) {
            var route = AddRouteService.execute(routeData);
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
            return route;
        }
    }

}());
