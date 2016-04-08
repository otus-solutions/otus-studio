(function() {
    'use strict';

    angular
        .module('otusjs.navigation')
        .service('RouteBuilderServiceX', RouteBuilderService);

    function RouteBuilderService() {
        var self = this;

        /* Public interface */
        self.createRoute = createRoute;

        function createRoute() {
            return {};
        }
    }

}());
