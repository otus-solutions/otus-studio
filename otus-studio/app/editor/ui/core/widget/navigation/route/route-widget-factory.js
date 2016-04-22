(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('RouteNavigationWidgetFactory', RouteNavigationWidgetFactory);

    function RouteNavigationWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(navigation, route) {
            return new RouteNavigationWidget(navigation, route);
        }

        return self;
    }

    function RouteNavigationWidget(navigation, route) {
        var self = this;

        init();

        function init() {
            self.index = route.index;
            self.name = route.name;
            self.destination = route.destination;

            self.nameTarget = 'survey.navigations[' + navigation.index + '].routes[' + route.index + '].name';
            self.destinationTarget = 'survey.navigations[' + navigation.index + '].routes[' + route.index + '].to';
            self.routeToRemoveTarget = 'survey.navigations[' + navigation.index + '].routeToRemove.' + route.index;
        }
    }

}());
