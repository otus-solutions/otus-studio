(function() {
  'use strict';

  angular
    .module('preview')
    .service('SurveyPreviewService', SurveyEditorService);

  SurveyEditorService.$inject = ['WorkspaceService'];

  function SurveyEditorService(WorkspaceService) {
    var self = this;

    /* Public interface */
    self.startPreview = startPreview;
    self.startPreviewWithSurveyTemplate = startPreviewWithSurveyTemplate;

    function startPreview(initializationData) {
      WorkspaceService.initializeWorkspace({
        owner: 'visitor'
      });
      WorkspaceService.startNewWork(initializationData);
    }

    function startPreviewWithSurveyTemplate(surveyTemplate) {
      WorkspaceService.initializeWorkspace({
        owner: 'visitor'
      });
      WorkspaceService.loadWork(surveyTemplate);
    }
  }

}());
