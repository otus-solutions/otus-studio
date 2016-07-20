(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('UpdateFillingRulesEventFactory', UpdateFillingRulesEventFactory);

    UpdateFillingRulesEventFactory.$inject = [
        'WorkspaceService'
    ];

    function UpdateFillingRulesEventFactory(WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new UpdateFillingRulesEvent(WorkspaceService);
        }

        return self;
    }

    function UpdateFillingRulesEvent(WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute() {
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());
