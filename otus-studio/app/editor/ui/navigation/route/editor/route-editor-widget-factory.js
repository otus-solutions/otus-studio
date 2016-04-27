(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('RouteEditorWidgetFactory', RouteEditorWidgetFactory);

    RouteEditorWidgetFactory.$inject = [
        'UpdateRouteEventFactory'
    ];

    function RouteEditorWidgetFactory(UpdateRouteEventFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(route, parentWidget) {
            return new RouteEditorWidget(route, parentWidget, UpdateRouteEventFactory);
        }

        return self;
    }

    function RouteEditorWidget(route, parentWidget, UpdateRouteEventFactory) {
        var self = this;

        /* Type definitions */
        self.name = 'Route';

        /* Instance definitions */
        self.parentWidget = parentWidget;

        /* View data */
        self.route = route;
        self.name = name;
        self.destination = destination;

        /* View data interface */
        function name(value) {
            if (value !== undefined) {
                self.route.name = value;
                UpdateRouteEventFactory.create().execute(self);
            }

            return self.route.name;
        }

        function destination(value) {
            if (value !== undefined) {
                self.route.destination = value;
                UpdateRouteEventFactory.create().execute(self);
            }

            return self.route.destination;
        }
    }

}());
