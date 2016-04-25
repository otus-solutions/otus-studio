(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('navigationEditor', navigationEditor);


    function navigationEditor() {
        var ddo = {
            scope: {},
            restrict: 'E',
            controller: 'NavigationController',
            templateUrl: 'app/editor/ui/navigation/editor/navigation-editor-template.html',
        };

        return ddo;
    }

}());
