(function() {
  'use strict';

  angular
    .module('editor.ui')
    .controller('SheetController', SheetController);

  SheetController.$inject = [
    '$scope',
    '$element',
    'SheetContentService',
    'EditionPreviewService',
    'WorkspaceService',
    '$window'
  ];

  function SheetController($scope, $element, SheetContentService, EditionPreviewService, WorkspaceService, $window) {
    var self = this;
    self.EditionPreviewService = EditionPreviewService;

    SheetContentService.init($scope, $element);

    _init();

    function _init() {
      if (EditionPreviewService.isLoadingMode()) {
        EditionPreviewService.setScope($scope);
        EditionPreviewService.loadSurveyTemplate().then(function(template) {
          EditionPreviewService.isLoading = false;
          WorkspaceService.getSurvey().NavigationManager.loadJsonData(template.navigationList);
        });
      } else {
        $window.sessionStorage.setItem('surveyTemplate_OID', WorkspaceService.getSurvey().oid);
      }
    }

    $scope.$on('$destroy', function cleanWorkspaceService() {
      WorkspaceService.closeWork();
      $window.sessionStorage.removeItem('surveyTemplate_OID');
    });
  }

}());
