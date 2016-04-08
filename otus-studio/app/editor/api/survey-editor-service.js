(function() {
    'use strict';

    angular
        .module('editor')
        .service('SurveyEditorService', SurveyEditorService);

    SurveyEditorService.$inject = ['WorkspaceService'];

    function SurveyEditorService(WorkspaceService) {
        var self = this;

        /* Public interface */
        self.startEditor = startEditor;

        function startEditor(initializationData) {
            WorkspaceService.initializeWorkspace({
                owner: 'user'
            });
            WorkspaceService.startNewWork(initializationData);
            console.log(WorkspaceService.workspace);
        }
    }

}());
