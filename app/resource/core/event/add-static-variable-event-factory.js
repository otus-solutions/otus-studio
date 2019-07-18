(function () {
  'use strict';

  angular
    .module('resources.core')
    .factory('resources.core.AddStaticVariableEventFactory', AddStaticVariableEventFactory);

  AddStaticVariableEventFactory.$inject = [
    '$rootScope',
    'WorkspaceService',
    'otusjs.staticVariable.AddStaticVariableService'
  ];

  function AddStaticVariableEventFactory($rootScope, WorkspaceService, AddStaticVariableService) {
    var self = this;

    /* Public interface */
    self.create = create;

    function create() {
      return new AddStaticVariableEvent($rootScope, WorkspaceService, AddStaticVariableService);
    }

    return self;
  }

  function AddStaticVariableEvent($rootScope, WorkspaceService, AddStaticVariableService) {
    var self = this;

    self.execute = execute;

    function execute(variable) {
      var item = AddStaticVariableService.execute(variable, WorkspaceService.getSurvey());
      $rootScope.$broadcast('item.add', item);
      WorkspaceService.workspace.currentItem = item;
      WorkspaceService.workspace.isdb.userEdits.store(self);
      WorkspaceService.saveWork();
    }
  }

}());
