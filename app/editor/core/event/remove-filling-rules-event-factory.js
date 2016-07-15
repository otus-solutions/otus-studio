(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('RemoveFillingRulesEventFactory', RemoveFillingRulesEventFactory);

    RemoveFillingRulesEventFactory.$inject = [
        'RemoveFillingRulesWorkService',
        'WorkspaceService'
    ];

    function RemoveFillingRulesEventFactory(RemoveFillingRulesWorkService, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new RemoveFillingRulesEvent(RemoveFillingRulesWorkService, WorkspaceService);
        }

        return self;
    }

    function RemoveFillingRulesEvent(RemoveFillingRulesWorkService, WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(questionSource, fillingRuleType) {
            RemoveFillingRulesWorkService.execute(questionSource.getItem(), fillingRuleType);
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());
