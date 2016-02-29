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

        function startEditor(data) {
            WorkspaceService.initializeWorkspace({
                owner: 'user'
            });
            WorkspaceService.startNewProject(data);
            console.log(WorkspaceService.workspace);
        }
    }

}());
