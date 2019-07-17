(function () {
  'use strict';

  angular
    .module('resource.core')
    .factory('AddSurveyResourceEventFactory', AddSurveyItemEventFactory);

  AddSurveyItemEventFactory.$inject = [
    '$rootScope',
    'WorkspaceService',
    'AddSurveyItemService',
    'PageAnchorService'
  ];

  function AddSurveyItemEventFactory($rootScope, WorkspaceService, AddSurveyItemService, PageAnchorService) {
    var self = this;

    /* Public interface */
    self.create = create;

    function create() {
      return new AddSurveyItemEvent($rootScope, WorkspaceService, AddSurveyItemService, PageAnchorService);
    }

    return self;
  }

  function AddSurveyItemEvent($rootScope, WorkspaceService, AddSurveyItemService, PageAnchorService) {
    var self = this;

    self.execute = execute;

    function execute(itemType) {
      var item = AddSurveyItemService.execute(itemType, WorkspaceService.getSurvey());
      $rootScope.$broadcast('item.add', item);
      WorkspaceService.workspace.currentItem = item;
      WorkspaceService.workspace.isdb.userEdits.store(self);
      WorkspaceService.saveWork();
      PageAnchorService.sheetAutoFocus();
    }
  }

}());
