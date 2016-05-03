(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('RouteEditorWidgetFactory', RouteEditorWidgetFactory);

    RouteEditorWidgetFactory.$inject = [
        'RemoveRouteEventFactory',
        'UpdateRouteEventFactory',
        'RouteEditorWindow'
    ];

    function RouteEditorWidgetFactory(RemoveRouteEventFactory, UpdateRouteEventFactory, RouteEditorWindow) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(route, parentWidget) {
            return new RouteEditorWidget(route, parentWidget, RemoveRouteEventFactory, UpdateRouteEventFactory, RouteEditorWindow);
        }

        return self;
    }

    function RouteEditorWidget(route, parentWidget, RemoveRouteEventFactory, UpdateRouteEventFactory, RouteEditorWindow) {
        var self = this;

        /* Type definitions */
        self.className = self.constructor.name;
        self.css = {};
        self.css.ngClass = {};

        /* Template definitions */

        /* CSS definitions */
        self.css.ngClass.open = false;

        /* Instance definitions */
        self.parent = parentWidget;
        self.routeData = route;
        self.routeData.parentNavigation = parentWidget.navigation;

        /* Public methods */
        self.editRoute = editRoute;
        self.removeRoute = removeRoute;
        self.name = name;
        self.destination = destination;

        /* Actions */
        function editRoute() {
            RouteEditorWindow.show();
        }

        function removeRoute() {
            RemoveRouteEventFactory.create().execute(self);
        }

        /* Getters and setters */
        function name(value) {
            if (value !== undefined) {
                self.routeData.name = value;
                UpdateRouteEventFactory.create().execute(self);
            }

            return self.routeData.name;
        }

        function destination(value) {
            if (value !== undefined) {
                self.routeData.destination = value;
                UpdateRouteEventFactory.create().execute(self);
            }

            return self.routeData.destination;
        }

    }

}());
