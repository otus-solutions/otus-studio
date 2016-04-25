(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('routeCreator', routeCreator);

    function routeCreator(WidgetService) {
        var ddo = {
            scope: {},
            restrict: 'E',
            controller: 'RouteCreatorController',
            templateUrl: 'app/editor/ui/navigation/route/creator/route-creator-template.html',
            link: function link(scope, element, attr, controller) {
            }
        };

        return ddo;
    }

}());
