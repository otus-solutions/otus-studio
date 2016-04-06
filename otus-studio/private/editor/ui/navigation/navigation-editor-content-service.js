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
        'UIUtils'
    ];

    function NavigationEditorContentService(mpath, TemplateLoaderService, WidgetService, WorkspaceService, UIUtils) {
        var self = this,
            scope = null,
            navigationEditor = null;

        /* Public interface */
        self.init = init;
        self.loadRoute = loadRoute;

        function init(scopeReference, navigationEditorReference) {
            scope = scopeReference;
            navigationEditor = navigationEditorReference;
            scope.widget = WidgetService.getNavigationEditorWidget(getCurrentNavigation());
        }

        function loadRoute(route) {
            var routeWidget = WidgetService.getRouteWidget(route);
            mergeScopeData(routeWidget);
        }

        function mergeScopeData(routeWidget) {
            scope.routes.push(routeWidget);
        }

        function getCurrentNavigation() {
            var lastAddedQuestion = WorkspaceService.workspace.isdb.dataPool.fetchLastAddedData();
            var currentSurvey = WorkspaceService.workspace.project.survey;
            var currentQuestion = lastAddedQuestion.oid;

            return currentSurvey.listNavigation(currentQuestion);
        }

    }

}());
