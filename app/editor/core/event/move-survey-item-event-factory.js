(function () {
  'use strict';

  angular
    .module('editor.core')
    .factory('MoveSurveyItemEventFactory', MoveSurveyItemEventFactory);

  MoveSurveyItemEventFactory.$inject = [
    '$rootScope',
    'WorkspaceService',
    'MoveSurveyItemService',
    'SurveyItemGroupService'
  ];

  function MoveSurveyItemEventFactory($rootScope, WorkspaceService, MoveSurveyItemService, SurveyItemGroupService) {
    var self = this;

    /* Public interface */
    self.create = create;

    function create() {
      return new MoveSurveyItemEvent($rootScope, WorkspaceService, MoveSurveyItemService, SurveyItemGroupService);
    }

    return self;
  }

  function MoveSurveyItemEvent($rootScope, WorkspaceService, MoveSurveyItemService, SurveyItemGroupService) {
    var self = this;

    self.execute = execute;

    function execute(item, position) {
      let itemGroup = SurveyItemGroupService.getGroup(item.templateID);
      MoveSurveyItemService.execute(WorkspaceService.getSurvey(), item, position);
      $rootScope.$broadcast('item.move', item, itemGroup);
      WorkspaceService.workspace.isdb.userEdits.store(self);
      WorkspaceService.saveWork();
    }
  }

}());
