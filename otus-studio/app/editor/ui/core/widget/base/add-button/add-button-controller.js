(function() {
    'use strict';

    angular
        .module('editor.ui')
        .controller('OtusAddButtonController', OtusAddButtonController);

    OtusAddButtonController.$inject = [
        '$scope',
        '$element',
        'OtusAddButtonWidgetFactory',
        'WorkspaceService'
    ];

    function OtusAddButtonController($scope, $element, OtusAddButtonWidgetFactory, WorkspaceService) {
        var self = this;

        self.component = OtusAddButtonWidgetFactory.create({
            scope: $scope,
            element: $element,
            workspace: WorkspaceService.workspace
        });
    }

})();
