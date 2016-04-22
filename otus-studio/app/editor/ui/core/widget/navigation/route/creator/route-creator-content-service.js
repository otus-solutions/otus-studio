(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('RouteCreatorContentService', RouteCreatorContentService);

    RouteCreatorContentService.$inject = [
        'WidgetService',
        'WorkspaceService',
        'UUID'
    ];

    function RouteCreatorContentService(WidgetService, WorkspaceService, UUID) {

        var self = this;
        var directiveScope;
        var scope;
        var routeCreator;
        var currentNavigation;

        self.init = init;
        self.reload = reload;

        function init(scopeReference, routeCreatorReference) {
            scope = scopeReference;
            directiveScope = scopeReference.$parent;
            routeCreator = routeCreatorReference;
        }

        function reload() {
            currentNavigation = getCurrentNavigation();
            scope.widget = WidgetService.getRouteCreatorWidget(currentNavigation, routeCreator);
        }

        function getCurrentNavigation() {
            var lastAddedQuestion = WorkspaceService.workspace.isdb.dataPool.fetchLastAddedData();
            var currentSurvey = WorkspaceService.workspace.project.survey;
            var currentQuestion = lastAddedQuestion.templateID;

            return currentSurvey.listNavigation(currentQuestion);
        }
    }

})();
