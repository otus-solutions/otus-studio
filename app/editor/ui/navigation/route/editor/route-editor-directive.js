(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusRouteEditors', otusRouteEditor);

    function otusRouteEditor() {
        var ddo = {
            scope: {
                leftIcon: '@',
                widget: '='
            },
            restrict: 'E',
            templateUrl: 'app/editor/ui/navigation/route/editor/route-editor.html'
        };

        return ddo;
    }

}());
