(function () {
  'use strict';

  angular
    .module('resources.core')
    .factory('resources.core.AddStaticVariableEventFactory', AddStaticVariableEventFactory);

  AddStaticVariableEventFactory.$inject = [
    'WorkspaceService',
    'otusjs.staticVariable.AddStaticVariableService'
  ];

  function AddStaticVariableEventFactory(WorkspaceService, AddStaticVariableService) {
    var self = this;

    /* Public interface */
    self.create = create;

    function create() {
      return new AddStaticVariableEvent(WorkspaceService, AddStaticVariableService);
    }

    return self;
  }

  function AddStaticVariableEvent(WorkspaceService, AddStaticVariableService) {
    var self = this;

    self.execute = execute;

    function execute(variable) {
      AddStaticVariableService.execute(WorkspaceService.getSurvey(), variable);
      WorkspaceService.saveWork();
    }
  }

}());
