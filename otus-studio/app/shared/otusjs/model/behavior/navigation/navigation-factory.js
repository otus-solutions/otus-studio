(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .factory('NavigationFactory', NavigationFactory);

    NavigationFactory.$inject = ['RouteFactory'];

    function NavigationFactory(RouteFactory) {
        var self = this;

        self.create = create;

        function create(origin, destination) {
            var navigation = new Navigation(origin);

            if (destination) {
                var defaultRoute = RouteFactory.create('1', navigation.origin, destination);
                navigation.addRoute(defaultRoute);
            }

            return navigation;
        }

        return self;
    }

    function Navigation(origin) {
        var self = this;

        /* Object properties */
        self.extents = 'StudioObject';
        self.objectType = 'Navigation';
        self.origin = origin;
        self.routes = [];

        /* Public methods */
        self.listRoutes = listRoutes;
        self.addRoute = addRoute;
        self.removeRoute = removeRoute;
        self.updateRoute = updateRoute;
        self.toJson = toJson;

        function listRoutes() {
            var clone = [];

            self.routes.forEach(function(route) {
                clone.push(route);
            });

            return clone;
        }

        function addRoute(route) {
            self.routes.push(route);
        }

        function removeRoute(name) {
            var routeToRemove = self.routes.filter(function(route) {
                return route.name === name;
            });

            var indexToRemove = self.routes.indexOf(routeToRemove[0]);
            if (indexToRemove > -1) self.routes.splice(indexToRemove, 1);
            return routeToRemove[0];
        }

        function updateRoute(route) {
            self.routes.forEach(function(currentRoute) {
                if (currentRoute.index === route.index) {
                    self.routes[currentRoute.index] = route;
                }
            });
        }

        function toJson() {
            var json = {};

            json.extents = self.extents;
            json.objectType = self.objectType;
            json.origin = self.origin;
            json.routes = [];
            self.routes.forEach(function(route) {
                json.routes.push(route.toJson());
            });

            return JSON.stringify(json).replace(/"{/g, '{').replace(/\}"/g, '}').replace(/\\/g, '');
        }

    }

}());
