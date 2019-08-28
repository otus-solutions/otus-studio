(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('AddSurveyItemGroupEventFactory', AddSurveyItemGroupEventFactory);

    AddSurveyItemGroupEventFactory.$inject = ['WorkspaceService'];

    function AddSurveyItemGroupEventFactory(WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new AddSurveyItemGroupEvent(WorkspaceService);
        }

        return self;
    }

    function AddSurveyItemGroupEvent(WorkspaceService) {
        var self = this;
        self.execute = execute;

        function execute() {
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());
