(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .factory('NavigationFactory', NavigationFactory);

    function NavigationFactory() {
        var self = this;

        self.create = create;

        function create(origin) {
            return new Navigation(origin);
        }

        return self;
    }

    function Navigation(origin) {
        var self = this;
        var routes = [];

        Object.defineProperty(self, 'extends', {
            value: 'StudioObject',
            writable: false,
            enumerable: true
        });

        Object.defineProperty(self, 'objectType', {
            value: 'Navigation',
            writable: false,
            enumerable: true
        });

        Object.defineProperty(self, 'origin', {
            value: origin,
            writable: false,
            enumerable: true
        });

        /* Public interface */
        self.listRoutes = listRoutes;
        self.addRoute = addRoute;
        self.removeRoute = removeRoute;

        function listRoutes() {
            return routes;
        }

        function addRoute(route) {
            routes.push(route);
        }

        function removeRoute(to) {
            var routeToRemove = routes.filter(function(route) {
                return route.to === to;
            });

            var indexToRemove = routes.indexOf(routeToRemove[0]);
            if (indexToRemove > -1) routes.splice(indexToRemove, 1);
        }

    }

}());
