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
            templateUrl: 'private/editor/ui/core/widget/navigation/editor/navigation-editor-template.html',
        };

        return ddo;
    }

}());
