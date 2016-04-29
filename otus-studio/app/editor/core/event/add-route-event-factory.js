(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('AddRouteEventFactory', AddRouteEventFactory);

    AddRouteEventFactory.$inject = [
        'AddRouteService',
        'WorkspaceService',
        'RouteNavigationWidgetFactory'
    ];

    function AddRouteEventFactory(AddRouteService, WorkspaceService, RouteNavigationWidgetFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new AddRouteEvent(AddRouteService, WorkspaceService, RouteNavigationWidgetFactory);
        }

        return self;
    }

    function AddRouteEvent(AddRouteService, WorkspaceService, RouteNavigationWidgetFactory) {
        var self = this;

        self.execute = execute;

        function execute(eventSource) {
            var navigationWidget = eventSource.parentWidget;
            var route = AddRouteService.execute(navigationWidget);

            var navigationEditorWidget = navigationWidget.parentWidget;
            var routeWidget = RouteNavigationWidgetFactory.create(route, navigationEditorWidget);
            navigationEditorWidget.routes.push(routeWidget);

            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());
