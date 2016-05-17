(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusNavigationEditor', otusNavigationEditor);

    otusNavigationEditor.$inject = [
        'NavigationWidgetFactory',
        'WorkspaceService'
    ];

    function otusNavigationEditor(NavigationWidgetFactory, WorkspaceService) {
        var ddo = {
            scope: {
                class: '@'
            },
            restrict: 'E',
            templateUrl: 'app/editor/ui/navigation/editor/navigation-editor.html',
            link: function linkFunc(scope, element, attrs) {
                var navigation = WorkspaceService.getSurvey().NavigationManager.getNavigationByOrigin(scope.$parent.widget.question.templateID);
                scope.widget = NavigationWidgetFactory.create(attrs, scope.$parent.widget, navigation);
            }
        };

        return ddo;
    }

}());
