(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('datatool', datatool);

    function datatool() {
        var ddo = {
            retrict: 'E',
            controller: 'DataToolController',
            templateUrl: 'private/editor/ui/data-tool/data-tool.html',
            transclude: true,
            link: linkFunc
        };

        return ddo;
    }

    function linkFunc(scope, element, attrs, controller, transclude) {
        var content = angular.element(transclude()[1]);
        element.append(content);
    }

}());
