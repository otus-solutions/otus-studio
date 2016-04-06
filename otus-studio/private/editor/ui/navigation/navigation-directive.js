(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('navigationQuestion', navigationQuestion);


    function navigationQuestion() {
        var ddo = {
            scope: {},
            restrict: 'E',
            controller: 'NavigationController',
            templateUrl: 'private/editor/ui/navigation/navigation-template.html',
        };

        return ddo;
    }

}());
