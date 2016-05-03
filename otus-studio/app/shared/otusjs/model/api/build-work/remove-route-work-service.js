(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .service('RemoveRouteService', RemoveRouteService);

    function RemoveRouteService() {
        var self = this;

        self.execute = execute;

        function execute(routeData) {
            routeData.parentNavigation.removeRoute(routeData.name);
        }
    }

}());
