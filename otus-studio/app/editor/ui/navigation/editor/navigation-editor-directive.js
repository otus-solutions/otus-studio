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
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/navigation/editor/navigation-editor.html',
            link: function linkFunc(scope) {
                var navigation = WorkspaceService.getSurvey().fetchNavigationByOrigin(scope.$parent.widget.question.templateID);
                scope.widget = NavigationWidgetFactory.create(scope.$parent.widget, navigation);
            }
        };

        return ddo;
    }

}());
