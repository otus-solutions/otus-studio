(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusNavigationEditor', otusNavigationEditor);

    otusNavigationEditor.$inject = [
        'RouteEditorWidgetFactory',
        'NavigationWidgetFactory',
        'WorkspaceService'
    ];

    function otusNavigationEditor(RouteEditorWidgetFactory, NavigationWidgetFactory, WorkspaceService) {
        var ddo = {
            scope: {
                class: '@'
            },
            restrict: 'E',
            templateUrl: 'app/editor/ui/navigation/editor/navigation-editor.html',
            link: function linkFunc(scope, element, attrs) {
                // var navigation = WorkspaceService.getSurvey().NavigationManager.getNavigationByOrigin(scope.$parent.widget.question.templateID);
                var NavigationManager = WorkspaceService.getSurvey().NavigationManager;
                scope.widget = NavigationWidgetFactory.create(scope, scope.$parent.widget, NavigationManager, RouteEditorWidgetFactory);
            }
        };

        return ddo;
    }

}());
