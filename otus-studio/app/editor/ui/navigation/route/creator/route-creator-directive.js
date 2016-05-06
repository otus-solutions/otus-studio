(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusRouteCreator', otusRouteCreator);

    otusRouteCreator.$inject = ['RouteCreatorWidgetFactory'];

    function otusRouteCreator(RouteCreatorWidgetFactory) {
        var ddo = {
            scope: {
                flex: '@',
                leftIcon: '@',
                layout: '@'
            },
            restrict: 'E',
            templateUrl: 'app/editor/ui/navigation/route/creator/route-creator.html',
            link: function link(scope, element, attr, controller) {
                scope.widget = RouteCreatorWidgetFactory.create(attr, element, scope.$parent.widget);
            }
        };

        return ddo;
    }

}());
