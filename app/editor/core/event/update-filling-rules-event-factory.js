(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('UpdateSurveyItemEventFactory', UpdateSurveyItemEventFactory);

    UpdateSurveyItemEventFactory.$inject = [
        'WorkspaceService'
    ];

    function UpdateSurveyItemEventFactory(WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new UpdateSurveyItemEvent(WorkspaceService);
        }

        return self;
    }

    function UpdateSurveyItemEvent(WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(data) {
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());
