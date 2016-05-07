(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('RouteCreatorWidgetFactory', RouteCreatorWidgetFactory);

    RouteCreatorWidgetFactory.$inject = [
        'AddRouteEventFactory',
        'RouteEditorWidgetFactory'
    ];

    function RouteCreatorWidgetFactory(AddRouteEventFactory, RouteEditorWidgetFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(templateData, element, parentWidget) {
            return new RouteCreatorWidget(templateData, element, parentWidget, AddRouteEventFactory, RouteEditorWidgetFactory);
        }

        return self;
    }

    function RouteCreatorWidget(templateData, element, parentWidget, AddRouteEventFactory, RouteEditorWidgetFactory) {
        var self = this;

        /* Type definitions */
        self.className = self.constructor.name;
        self.template = {};
        self.css = {};
        self.css.ngClass = {};

        /* Instance definitions */
        self.parent = parentWidget;
        self.routeData = {};
        self.routeData.parentNavigation = parentWidget.navigation;

        /* Template definitions */
        self.template.flex = templateData.flex;
        self.template.icon = 'low_priority';
        self.template.layout = templateData.layout;

        /* CSS definitions */
        self.css.class = templateData.class;
        self.css.ngClass.open = false;

        /* Public methods */
        self.routeName = routeName;
        self.routeDestination = routeDestination;
        self.createRoute = createRoute;

        function routeName(value) {
            if (value !== undefined)
                self.routeData.name = value;

            return self.routeData.name;
        }

        function routeDestination(value) {
            if (value !== undefined)
                self.routeData.destination = value;

            return self.routeData.destination;
        }

        function createRoute() {
            var route = AddRouteEventFactory.create().execute(self.routeData);
            var routeWidget = RouteEditorWidgetFactory.create(route, self.parent);
            self.parent.addRoute(routeWidget);
        }
    }

}());
