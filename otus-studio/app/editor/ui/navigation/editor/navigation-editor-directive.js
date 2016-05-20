(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusNavigationEditor', otusNavigationEditor);

    otusNavigationEditor.$inject = [
        'RouteEditorWidgetFactory',
        'NavigationWidgetFactory',
        'WorkspaceService',
        'UUIDService'
    ];

    function otusNavigationEditor(RouteEditorWidgetFactory, NavigationWidgetFactory, WorkspaceService, UUIDService) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/navigation/editor/navigation-editor.html',
            link: function linkFunc(scope, element, attrs) {
                scope.uuid = UUIDService.generateUUID();
                var NavigationManager = WorkspaceService.getSurvey().NavigationManager;
                scope.widget = NavigationWidgetFactory.create(scope, element, NavigationManager, RouteEditorWidgetFactory);
            }
        };

        return ddo;
    }

}());
