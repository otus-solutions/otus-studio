(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('AddFillingRulesEventFactory', AddFillingRulesEventFactory);

    AddFillingRulesEventFactory.$inject = [
        'AddFillingRulesService',
        'WorkspaceService'
    ];

    function AddFillingRulesEventFactory(AddFillingRulesService, WorkspaceService) {
        var self = this;

        self.create = create;

        function create() {
            return new AddFillingRulesEvent(AddFillingRulesService, WorkspaceService);
        }

        return self;
    }

    function AddFillingRulesEvent(AddFillingRulesService, WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(questionReference, validator) {            
            var option = AddFillingRulesService.execute(questionReference, validator);
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
            return option;
        }
    }

}());
