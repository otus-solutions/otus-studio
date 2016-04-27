(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('AddRouteEventFactory', AddRouteEventFactory);

    AddRouteEventFactory.$inject = [
        'AddRouteService',
        'WorkspaceService',
        'RouteEditorWidgetFactory'
    ];

    function AddRouteEventFactory(AddRouteService, WorkspaceService, RouteEditorWidgetFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new AddRouteEvent(AddRouteService, WorkspaceService, RouteEditorWidgetFactory);
        }

        return self;
    }

    function AddRouteEvent(AddRouteService, WorkspaceService, RouteEditorWidgetFactory) {
        var self = this;

        self.execute = execute;

        function execute(eventSource) {
            var routeCreatorWidget = eventSource.parentWidget;
            var route = AddRouteService.execute(routeCreatorWidget);

            var navigationEditorWidget = routeCreatorWidget.parentWidget;
            var routeWidget = RouteEditorWidgetFactory.create(route, navigationEditorWidget);
            navigationEditorWidget.addRoute(routeWidget);

            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());
