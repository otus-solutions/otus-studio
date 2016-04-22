(function() {
    'use strict';

    angular
        .module('editor.ui')
        .controller('OtusRemoveButtonController', OtusRemoveButtonController);

    OtusRemoveButtonController.$inject = [
        '$scope',
        '$element',
        'OtusRemoveButtonWidgetFactory',
        'WorkspaceService'
    ];

    function OtusRemoveButtonController($scope, $element, OtusRemoveButtonWidgetFactory, WorkspaceService) {
        var self = this;

        $scope.$emit('otusWidgetPreLoad');

        self.component = OtusRemoveButtonWidgetFactory.create({
            scope: $scope,
            element: $element
        });
    }

})();
