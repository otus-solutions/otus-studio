(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('SelectDataEventFactory', SelectDataEventFactory);

    SelectDataEventFactory.$inject = ['WorkspaceService', 'UIDataSelector'];

    function SelectDataEventFactory(WorkspaceService, UIDataSelector) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(prototype) {
            return new SelectDataEvent(prototype, WorkspaceService, UIDataSelector);
        }

        return self;
    }

    function SelectDataEvent(prototype, WorkspaceService, UIDataSelector) {
        var self = this;

        /* Public interface */
        self.forward = forward;

        function forward() {
            UIDataSelector.select(prototype.target);
            WorkspaceService.workspace.isdb.userEdits.store(prototype);
        }
    }

}());
