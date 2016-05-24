(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusRouteCondition', directive);

    directive.$inject = ['RouteConditionWidgetFactory'];

    function directive(RouteConditionWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/navigation/route-condition/route-condition.html',
            link: function linkFunc(scope) {
                var route = scope.$parent.routeConditionDialog.currentRoute;
                scope.widget = RouteConditionWidgetFactory.create(route, scope.$parent.routeConditionDialog);
            }
        };

        return ddo;
    }

}());
