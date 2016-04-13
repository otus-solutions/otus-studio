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

    function Navigation(navigationOrigin) {

        var self = this;

        var extents;
        var objectType;
        var index;
        var origin;
        var routes;

        init();

        /* Public interface */
        self.getExtents = getExtents;
        self.getObjectType = getObjectType;
        self.getIndex = getIndex;
        self.setIndex = setIndex;
        self.getOrigin = getOrigin;
        self.listRoutes = listRoutes;
        self.addRoute = addRoute;
        self.removeRoute = removeRoute;

        function init() {
            extents = 'StudioObject';
            objectType = 'Navigation';
            origin = navigationOrigin;
            routes = [];
        }

        function getExtents() {
            return extents;
        }

        function getObjectType() {
            return objectType;
        }

        function getIndex() {
            return index;
        }

        function setIndex(value) {
            index = value;
        }

        function getOrigin() {
            return origin;
        }

        function listRoutes() {
            var clone = [];

            routes.forEach(function(route) {
                clone.push(route);
            });

            return clone;
        }

        function addRoute(route) {
            routes.push(route);
        }

        function removeRoute(name) {
            var routeToRemove = routes.filter(function(route) {
                return route.getName() === name;
            });

            var indexToRemove = routes.indexOf(routeToRemove[0]);
            if (indexToRemove > -1) routes.splice(indexToRemove, 1);
            return routeToRemove[0];
        }

    }

}());
