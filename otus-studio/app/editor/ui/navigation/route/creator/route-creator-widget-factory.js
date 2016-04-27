(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('RouteCreatorWidgetFactory', RouteCreatorWidgetFactory);

    RouteCreatorWidgetFactory.$inject = ['UUID'];

    function RouteCreatorWidgetFactory(UUID) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, parentWidget) {
            return new RouteCreatorWidget(scope, parentWidget, UUID);
        }

        return self;
    }

    function RouteCreatorWidget(scope, parentWidget, UUID) {
        var self = this;

        /* Type definitions */
        self.name = 'RouteCreator';

        /* Instance definitions */
        self.newRoute = {};
        self.parentWidget = parentWidget;
        self.navigation = parentWidget.navigation;
        self.question = parentWidget.question;

        /* User definitions */
        self.icon = 'low_priority';

        /* Public interface */
        self.routeName = routeName;
        self.routeDestination = routeDestination;

        /* View data interface */
        function routeName(value) {
            if (value !== undefined)
                self.newRoute.name = value;

            return self.newRoute.name;
        }

        function routeDestination(value) {
            if (value !== undefined)
                self.newRoute.destination = value;

            return self.newRoute.destination;
        }

    }

}());
