(function() {
    'use strict';

    angular
        .module('editor.ui')
        .controller('SheetController', SheetController);

    SheetController.$inject = [
        '$scope',
        '$element',
        'SheetContentService',
        'WorkspaceService'
    ];

    function SheetController($scope, $element, SheetContentService, WorkspaceService) {
        var self = this;
        SheetContentService.init($scope, $element);
        WorkspaceService.registerObserver(self);
    }

}());
