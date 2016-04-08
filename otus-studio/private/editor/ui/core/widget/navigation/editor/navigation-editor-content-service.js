(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('NavigationEditorContentService', NavigationEditorContentService);

    NavigationEditorContentService.$inject = [
        'editor.ui.mpath',
        'TemplateLoaderService',
        'WidgetService',
        'WorkspaceService',
        'RouteCreatorContentService'
    ];

    function NavigationEditorContentService(mpath, TemplateLoaderService, WidgetService, WorkspaceService, RouteCreatorContentService) {

        var self = this;
        var scope;
        var navigationEditor;
        var currentNavigation;

        /* Public interface */
        self.init = init;
        self.loadRoute = loadRoute;

        function init(scopeReference, navigationEditorReference) {
            scope = scopeReference;
            navigationEditor = navigationEditorReference;
            currentNavigation = getCurrentNavigation();
            scope.widget = WidgetService.getNavigationEditorWidget(currentNavigation);
        }

        function loadRoute(route) {
            var routeWidget = WidgetService.getRouteWidget(currentNavigation, route);
            scope.routes.push(routeWidget);
            RouteCreatorContentService.reload();
        }

        function getCurrentNavigation() {
            var lastAddedQuestion = WorkspaceService.workspace.isdb.dataPool.fetchLastAddedData();
            var currentSurvey = WorkspaceService.workspace.project.survey;
            var currentQuestion = lastAddedQuestion.oid;

            return currentSurvey.listNavigation(currentQuestion);
        }
    }

}());
