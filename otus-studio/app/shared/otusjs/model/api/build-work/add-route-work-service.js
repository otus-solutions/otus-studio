(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .service('AddRouteService', AddRouteService);

    AddRouteService.$inject = [
        'WorkspaceService',
        'RouteFactory'
    ];

    function AddRouteService(WorkspaceService, RouteFactory) {
        var self = this;

        self.execute = execute;

        function execute(routeData) {
            var route = RouteFactory.create(routeData.name, routeData.parentNavigation.origin, routeData.destination);
            routeData.parentNavigation.addRoute(route);
            return route;
        }
    }

}());
