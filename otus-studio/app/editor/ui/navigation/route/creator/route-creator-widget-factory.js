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

        function create(templateData, element, parentWidget) {
            return new RouteCreatorWidget(templateData, element, parentWidget, UUID);
        }

        return self;
    }

    function RouteCreatorWidget(templateData, element, parentWidget, UUID) {
        var self = this;

        /* Type definitions */
        self.name = 'RouteCreator';

        /* Instance definitions */
        self.newRoute = {};
        self.parentWidget = parentWidget;
        self.navigation = parentWidget.navigation;
        self.question = parentWidget.question;

        /* User definitions */
        self.flex = templateData.flex;
        self.layout = templateData.layout;
        self.icon = 'low_priority';
        self.css = {};
        self.css.class = templateData.class;

        self.ngClass = {
            open: false
        };

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
