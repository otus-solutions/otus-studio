(function () {
  'use strict';

  angular
    .module('resources.core')
    .factory('resources.core.AddStaticVariableEventFactory', AddStaticVariableEventFactory);

  AddStaticVariableEventFactory.$inject = [
    'WorkspaceService',
    'otusjs.staticVariable.AddStaticVariableTaskService'
  ];

  function AddStaticVariableEventFactory(WorkspaceService, AddStaticVariableTaskService) {
    var self = this;

    /* Public interface */
    self.create = create;

    function create() {
      return new AddStaticVariableEvent(WorkspaceService, AddStaticVariableTaskService);
    }

    return self;
  }

  function AddStaticVariableEvent(WorkspaceService, AddStaticVariableTaskService) {
    var self = this;

    self.execute = execute;

    function execute(variable) {
      AddStaticVariableTaskService.execute(WorkspaceService.getSurvey(), variable);
      WorkspaceService.saveWork();
    }
  }

}());
