(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('NavigationWidgetFactory', NavigationWidgetFactory);

    function NavigationWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element, NavigationManagerService, RouteEditorWidgetFactory) {
            return new NavigationWidget(scope, element, NavigationManagerService, RouteEditorWidgetFactory);
        }

        return self;
    }

    function NavigationWidget(scope, element, NavigationManagerService, RouteEditorWidgetFactory) {
        var self = this;
        var ROUTE_NAME_PREFIX = 'Rota ';

        /* Type definitions */
        self.className = 'NavigationEditorWidget';

        /* Instance definitions */
        self.element = element;
        self.uuid = scope.uuid;
        self.parent = scope.$parent.widget;
        self.question = self.parent.question;
        self.navigation = NavigationManagerService.getNavigationByOrigin(self.question.templateID);
        self.routeWidgets = [];
        self.routeCreatorWidget = null;

        /* Scope event listeners */
        var questionAddEvent;
        var questionRemoveEvent;

        enableQuestionAddEventListener();
        enableQuestionRemoveEventListener(self.question);

        /* User definitions */
        self.css = {};
        self.css.class = scope.class;

        /* Public methods */
        self.addRoute = addRoute;
        self.removeRoute = removeRoute;
        self.getRouteName = getRouteName;

        function getRouteName() {
            return ROUTE_NAME_PREFIX + (self.routeWidgets.length + 1);
        }

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

        /* Scope event listeners */
        function enableQuestionAddEventListener() {
            questionAddEvent = scope.$on('questionPallete.question.add', function(event, addedQuestion) {
                self.navigation = NavigationManagerService.getNavigationByOrigin(self.question.templateID);
                if (self.navigation) {
                    self.routeCreatorWidget.routeData.parentNavigation = self.navigation;
                    addRoute(self.navigation.listRoutes()[0]);
                    questionAddEvent();
                    enableQuestionRemoveEventListener(addedQuestion);
                }
            });
        }

        function enableQuestionRemoveEventListener(question) {
            questionRemoveEvent = scope.$on('questionEditorWidget.delete.' + question.templateID, function() {
                self.routeWidgets = [];
                questionRemoveEvent();
                enableQuestionAddEventListener();
            });
        }
    }

}());
