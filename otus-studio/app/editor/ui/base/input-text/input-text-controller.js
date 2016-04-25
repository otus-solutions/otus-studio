(function() {
    'use strict';

    angular
        .module('editor.ui')
        .controller('OtusInputTextController', OtusInputTextController);

    OtusInputTextController.$inject = [
        '$scope',
        '$element',
        'OtusInputTextWidgetFactory',
        'WorkspaceService'
    ];

    function OtusInputTextController($scope, $element, OtusInputTextWidgetFactory, WorkspaceService) {
        var self = this;

        $scope.$emit('otusWidgetPreLoad');

        self.component = OtusInputTextWidgetFactory.create({
            scope: $scope,
            element: $element
        });
    }

})();
