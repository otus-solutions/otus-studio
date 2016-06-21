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
        self.startEditorWithSurveyTemplate = startEditorWithSurveyTemplate;

        function startEditor(initializationData) {
            WorkspaceService.initializeWorkspace({
                owner: 'visitor'
            });
            WorkspaceService.startNewWork(initializationData);
        }

        function startEditorWithSurveyTemplate(surveyTemplate) {
            WorkspaceService.initializeWorkspace({
                owner: 'visitor'
            });
            WorkspaceService.loadWork(surveyTemplate);
        }
    }

}());
