(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('NavigationWidgetFactory', NavigationWidgetFactory);

    function NavigationWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(templateData, parentWidget, navigation) {
            return new NavigationWidget(templateData, parentWidget, navigation);
        }

        return self;
    }

    function NavigationWidget(templateData, parentWidget, navigation) {
        var self = this;

        self.name = 'Navigation';
        self.parentWidget = parentWidget;
        self.question = parentWidget.question;
        self.navigation = navigation;
        self.routes = [];

        /* User definitions */
        self.css = {};
        self.css.class = templateData.class;

        self.addRoute = addRoute;
        self.removeRoute = removeRoute;

        function addRoute(route) {
            self.routes.push(route);
        }

        function removeRoute(name) {
            var routeToRemove = self.routes.filter(function(routeEditor) {
                return routeEditor.name() === name;
            });

            var indexToRemove = self.routes.indexOf(routeToRemove[0]);
            if (indexToRemove > -1) self.routes.splice(indexToRemove, 1);
            return routeToRemove[0];
        }
    }

}());
