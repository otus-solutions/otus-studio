(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('NavigationWidgetFactory', NavigationWidgetFactory);

    function NavigationWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, parentWidget, NavigationManagerService, RouteEditorWidgetFactory) {
            return new NavigationWidget(scope, parentWidget, NavigationManagerService, RouteEditorWidgetFactory);
        }

        return self;
    }

    function NavigationWidget(scope, parentWidget, NavigationManagerService, RouteEditorWidgetFactory) {
        var self = this;
        var ROUTE_NAME_PREFIX = 'Rota ';

        self.className = 'NavigationWidget';
        self.parentWidget = parentWidget;
        self.question = parentWidget.question;
        self.navigation = NavigationManagerService.getNavigationByOrigin(parentWidget.question.templateID);
        self.routeWidgets = [];
        self.routeCreatorWidget = null;

        /* User definitions */
        self.css = {};
        self.css.class = scope.class;

        self.addRoute = addRoute;
        self.removeRoute = removeRoute;
        self.getRouteName = getRouteName;

        function addRoute(route) {
            var routeWidget = RouteEditorWidgetFactory.create(route, self.navigation);
            self.routeWidgets.push(routeWidget);
        }

        function removeRoute(name) {
            var routeToRemove = self.routeWidgets.filter(function(routeEditorWidget) {
                return routeEditorWidget.name() === name;
            });

            var indexToRemove = self.routeWidgets.indexOf(routeToRemove[0]);
            if (indexToRemove > -1) self.routeWidgets.splice(indexToRemove, 1);
            return routeToRemove[0];
        }

        function getRouteName() {
            return ROUTE_NAME_PREFIX + (self.routeWidgets.length + 1);
        }

        /* Event listeners */
        var questionAdd = scope.$on('questionPallete.question.add', function() {
            if (!self.navigation) {
                self.navigation = NavigationManagerService.getNavigationByOrigin(parentWidget.question.templateID);
                self.routeCreatorWidget.routeData.parentNavigation = self.navigation;
            }

            addRoute(self.navigation.listRoutes()[0]);

            questionAdd();
        });
    }

}());
