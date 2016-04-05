(function() {
    'use strict';

    angular
        .module('otusjs.navigation')
        .service('RouteBuilderService', RouteBuilderService);

    function RouteBuilderService() {
        var self = this;

        /* Public interface */
        self.createRoute = createRoute;

        function createRoute() {
            return {};
        }
    }

}());
