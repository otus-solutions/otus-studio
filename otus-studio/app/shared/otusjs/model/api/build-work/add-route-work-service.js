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

        function execute(eventSource) {
            var navigation = eventSource.navigation;
            var routeDestination = eventSource.routeDestination;
            var routeIndex = navigation.listRoutes().length;
            var route = RouteFactory.create(navigation.origin, routeDestination, routeIndex);
            route.name = eventSource.routeName;
            navigation.addRoute(route);
            return route;
        }
    }

}());
