(function() {
    'use strict';

    angular
        .module('otusjs.navigation')
        .factory('RouteBuilderFactory', RouteBuilderFactory);

    RouteBuilderFactory.$inject = ['RouteFactory'];

    function RouteBuilderFactory(RouteFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new RouteBuilder(RouteFactory);
        }

        return self;
    }

    function RouteBuilder(RouteFactory) {
        var self = this;
        var route = null;
        var routeOrigin = null;

        /* Public interface */
        self.createRoute = createRoute;

        function createRoute() {
            self.from = from;
            return self;
        }

        function from(origin) {
            routeOrigin = origin;
            self.to = to;
            return self;
        }

        function to(destination) {
            route = RouteFactory.create(routeOrigin, destination);
            self.getRoute = getRoute;
            return self;
        }

        function getRoute() {
            return route;
        }
    }

}());
