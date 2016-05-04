(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('RouteCreatorWidgetFactory', RouteCreatorWidgetFactory);

    RouteCreatorWidgetFactory.$inject = ['AddRouteEventFactory'];

    function RouteCreatorWidgetFactory(AddRouteEventFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(templateData, element, parentWidget) {
            return new RouteCreatorWidget(templateData, element, parentWidget, AddRouteEventFactory);
        }

        return self;
    }

    function RouteCreatorWidget(templateData, element, parentWidget, AddRouteEventFactory) {
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
            AddRouteEventFactory.create().execute(self);
        }
    }

}());
