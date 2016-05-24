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

        self.className = 'NavigationEditorWidget';
        self.css = {};

        var navigation = NavigationManagerService.getNavigationByOrigin(getItem().templateID);
        var routeEditorWidgets = [];
        var routeCreatorWidget = null;

        /* Public methods */
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getNavigation = getNavigation;
        self.getItem = getItem;
        self.listRouteWidgets = listRouteWidgets;
        self.addRoute = addRoute;
        self.removeRoute = removeRoute;

        setupScopeEvents();

        function getUUID() {
            return scope.uuid;
        }

        function getElement() {
            return element;
        }

        function getParent() {
            return scope.$parent.widget;
        }

        function getItem() {
            return getParent().getItem();
        }

        function getNavigation() {
            return navigation;
        }

        function listRouteWidgets() {
            return routeEditorWidgets;
        }

        function addRoute(route) {
            var routeWidget = RouteEditorWidgetFactory.create(route, navigation);
            routeEditorWidgets.push(routeWidget);
        }

        function removeRoute(name) {
            var routeToRemove = routeEditorWidgets.filter(function(routeEditorWidget) {
                return routeEditorWidget.name() === name;
            });

            var indexToRemove = routeEditorWidgets.indexOf(routeToRemove[0]);
            if (indexToRemove > -1) routeEditorWidgets.splice(indexToRemove, 1);

            return routeToRemove[0];
        }

        //---------------------------------------------------------------------
        // Scope event definitions
        //---------------------------------------------------------------------
        var disableQuestionAddEventListener;
        var disableQuestionRemoveEventListener;

        function setupScopeEvents() {
            enableQuestionAddEventListener(disableQuestionRemoveEventListener);
            enableQuestionRemoveEventListener(getItem().templateID, disableQuestionAddEventListener);
        }

        function enableQuestionAddEventListener() {
            disableQuestionAddEventListener = scope.$on('item.add', addQuestionListener);
        }

        function enableQuestionRemoveEventListener(templateID) {
            disableQuestionRemoveEventListener = scope.$on('item.remove.' + templateID, removeQuestionListener);
        }

        function addQuestionListener(event, addedQuestion) {
            navigation = NavigationManagerService.getNavigationByOrigin(getItem().templateID);
            if (navigation) {
                // routeCreatorWidget.routeData.parentNavigation = navigation;
                addRoute(navigation.listRoutes()[0]);
                enableQuestionRemoveEventListener(addedQuestion.templateID);
                disableQuestionAddEventListener();
            }
        }

        function removeQuestionListener(event, removedQuestion) {
            routeEditorWidgets = [];
            navigation = NavigationManagerService.getNavigationByOrigin(getItem().templateID);

            if (navigation) {
                navigation.routes.forEach(function(route) {
                    addRoute(route);
                    enableQuestionRemoveEventListener(route.destination);
                });
            } else {
                enableQuestionAddEventListener();
                disableQuestionRemoveEventListener();
            }
        }
    }

}());
