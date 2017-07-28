(function () {
  'use strict';

  angular
    .module('editor.core')
    .factory('AddSurveyItemEventFactory', AddSurveyItemEventFactory);

  AddSurveyItemEventFactory.$inject = [
    '$rootScope',
    'WorkspaceService',
    'AddSurveyItemService',
  ];

  function AddSurveyItemEventFactory($rootScope, WorkspaceService, AddSurveyItemService) {
    var self = this;

    /* Public interface */
    self.create = create;

    function create() {
      return new AddSurveyItemEvent($rootScope, WorkspaceService, AddSurveyItemService);
    }

    return self;
  }

  function AddSurveyItemEvent($rootScope, WorkspaceService, AddSurveyItemService) {
    var self = this;

    self.execute = execute;

    function execute(itemType) {
      var item = AddSurveyItemService.execute(itemType, WorkspaceService.getSurvey());
      //TODO auto focus
      // PageAnchorService deve funcionar pelo id
      $rootScope.$broadcast('item.add', item);
      WorkspaceService.workspace.currentItem = item;
      WorkspaceService.workspace.isdb.userEdits.store(self);
      WorkspaceService.saveWork();
    }
  }

}());
