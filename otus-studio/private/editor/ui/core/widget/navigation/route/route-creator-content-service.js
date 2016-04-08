(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('RouteCreatorContentService', RouteCreatorContentService);

    RouteCreatorContentService.$inject = [
        'WidgetService',
        'WorkspaceService'
    ];

    function RouteCreatorContentService(WidgetService, WorkspaceService) {

        var self = this;
        var scope;
        var routeCreator;
        var currentNavigation;

        self.init = init;
        self.reload = reload;

        function init(scopeReference, routeCreatorReference) {
            scope = scopeReference;
            routeCreator = routeCreatorReference;
        }

        function reload() {
            currentNavigation = getCurrentNavigation();
            scope.widget = WidgetService.getRouteCreatorWidget(currentNavigation);
            var routeNameField = angular.element(routeCreator.children().children().children().children()[2]);
            var routeDestinationField = angular.element(routeCreator.children().children().children().children()[5]);

            routeNameField.attr('es-target', 'survey.navigations[' + currentNavigation.getIndex() + '].routes[' + currentNavigation.listRoutes().length + '].name');
            routeNameField.val('');
            routeNameField.blur();

            routeDestinationField.attr('es-target', 'survey.navigations[' + currentNavigation.getIndex() + '].routes[' + currentNavigation.listRoutes().length + '].to');
            routeDestinationField.val('');
            routeDestinationField.blur();

            routeNameField.focus();
        }

        function getCurrentNavigation() {
            var lastAddedQuestion = WorkspaceService.workspace.isdb.dataPool.fetchLastAddedData();
            var currentSurvey = WorkspaceService.workspace.project.survey;
            var currentQuestion = lastAddedQuestion.oid;

            return currentSurvey.listNavigation(currentQuestion);
        }
    }

})();
