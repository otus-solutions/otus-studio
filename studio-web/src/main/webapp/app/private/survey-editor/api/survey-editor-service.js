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

        function startEditor() {
            if (WorkspaceService.existsWorkInProgress()) {
                WorkspaceService.loadWork();
            } else {
                WorkspaceService.initializeWorkspace({
                    owner: 'user'
                });
                WorkspaceService.startNewProject();
            }
        }
    }

}());
