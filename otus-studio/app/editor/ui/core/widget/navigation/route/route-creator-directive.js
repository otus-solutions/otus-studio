(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('routeCreator', routeCreator);

    function routeCreator() {
        var ddo = {
            scope: {},
            restrict: 'E',
            controller: 'RouteCreatorController',
            templateUrl: 'private/editor/ui/core/widget/navigation/route/route-creator-template.html'
        };

        return ddo;
    }

}());
