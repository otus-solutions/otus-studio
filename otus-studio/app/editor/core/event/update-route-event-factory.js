(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('UpdateRouteEventFactory', UpdateRouteEventFactory);

    UpdateRouteEventFactory.$inject = [
        'UpdateRouteService',
        'WorkspaceService'
    ];

    function UpdateRouteEventFactory(UpdateRouteService, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new UpdateRouteEvent(UpdateRouteService, WorkspaceService);
        }

        return self;
    }

    function UpdateRouteEvent(UpdateRouteService, WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(eventSource) {
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());
