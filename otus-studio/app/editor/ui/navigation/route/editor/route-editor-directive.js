(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusRouteEditor', otusRouteEditor);

    otusRouteEditor.$inject = ['RouteEditorWidgetFactory'];

    function otusRouteEditor(RouteEditorWidgetFactory) {
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
