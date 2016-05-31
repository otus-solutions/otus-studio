(function() {
    'use strict';

    angular
        .module('editor')
        .service('SurveyEditorService', SurveyEditorService);

    SurveyEditorService.$inject = ['WorkspaceService', '$window'];

    function SurveyEditorService(WorkspaceService) {
        var self = this;

        /* Public interface */
        self.startEditor = startEditor;

        function startEditor(initializationData) {
            WorkspaceService.initializeWorkspace({
                owner: 'visitor'
            });
            WorkspaceService.startNewWork(initializationData);
        }
    }

}());
