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
            self.index = route.getIndex();
            self.name = route.getName();
            self.destination = route.getDestination();

            self.nameTarget = 'survey.navigations[' + navigation.getIndex() + '].routes[' + route.getIndex() + '].name';
            self.destinationTarget = 'survey.navigations[' + navigation.getIndex() + '].routes[' + route.getIndex() + '].to';
            self.routeToRemoveTarget = 'survey.navigations[' + navigation.getIndex() + '].routeToRemove.' + route.getName();
        }
    }

}());
