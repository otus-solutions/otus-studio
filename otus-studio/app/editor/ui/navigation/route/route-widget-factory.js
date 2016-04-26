(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('RouteNavigationWidgetFactory', RouteNavigationWidgetFactory);

    function RouteNavigationWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(route, navigation) {
            return new RouteNavigationWidget(route, navigation);
        }

        return self;
    }

    function RouteNavigationWidget(route, navigation) {
        var self = this;

        self.index = route.index;
        self.name = route.name;
        self.destination = route.destination;
    }

}());
