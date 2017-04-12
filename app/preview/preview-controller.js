(function() {
  'use strict';

  angular
    .module('preview')
    .controller('PreviewMenuController', Controller);

  Controller.$inject = [
    'DashboardStateService',
    'EditionPreviewService',
    'WorkspaceService',
    'SurveyEditorService',
    '$window'
  ];

  function Controller(DashboardStateService, EditionPreviewService, WorkspaceService, SurveyEditorService, $window) {
    var self = this;

    /* Public interface */
    self.backToEditor = backToEditor;

    function backToEditor() {
      if (EditionPreviewService.isLoadingMode()) {
        EditionPreviewService.setScope($scope);
        EditionPreviewService.loadSurveyTemplate().then(function(template) {
          SurveyEditorService.startEditorWithSurveyTemplate(template);
          EditionPreviewService.isLoading = false;
          WorkspaceService.getSurvey().NavigationManager.loadJsonData(template.navigationList);
          DashboardStateService.goToEditor();
        });
      } else {
        $window.sessionStorage.setItem('surveyTemplate_OID', WorkspaceService.getSurvey().oid);
      }

    }
  }
}());
