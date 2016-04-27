(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusRouteEditor', otusRouteEditor);

    otusRouteEditor.$inject = ['RouteEditorWidgetFactory'];

    function otusRouteEditor(RouteEditorWidgetFactory) {
        var ddo = {
            scope: {
                leftIcon: '@'
            },
            restrict: 'E',
            templateUrl: 'app/editor/ui/navigation/route/editor/route-editor.html',
            link: function linkFunc(scope) {
                scope.widget = scope.$parent.route;
            }
        };

        return ddo;
    }

}());
