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
        self.element = element;

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
        self.routeDestination = routeDestination;
        self.createRoute = createRoute;

        self.parent.routeCreatorWidget = self;

        function routeDestination(value) {
            if (value !== undefined)
                self.routeData.destination = value;

            return self.routeData.destination;
        }

        function createRoute() {
            self.routeData.name = self.parent.getRouteName();
            var route = AddRouteEventFactory.create().execute(self.routeData);
            self.parent.addRoute(route);

            self.element.find('input').val('');
            self.element.find('input').blur();
        }
    }

}());
