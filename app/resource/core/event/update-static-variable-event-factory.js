(function () {
  'use strict';

  angular
    .module('resources.core')
    .factory('resources.core.UpdateStaticVariableEventFactory', UpdateStaticVariableEventFactory);

  UpdateStaticVariableEventFactory.$inject = [
    'WorkspaceService',
    'otusjs.staticVariable.UpdateStaticVariableTaskService'
  ];

  function UpdateStaticVariableEventFactory(WorkspaceService, UpdateStaticVariableTaskService) {
    var self = this;

    /* Public interface */
    self.create = create;

    function create() {
      return new UpdateStaticVariableEvent(WorkspaceService, UpdateStaticVariableTaskService);
    }

    return self;
  }

  function UpdateStaticVariableEvent(WorkspaceService, UpdateStaticVariableTaskService) {
    var self = this;

    self.execute = execute;

    function execute(index, variable) {
      UpdateStaticVariableTaskService.execute(WorkspaceService.getSurvey(), index, variable);
      WorkspaceService.saveWork();
    }
  }

}());
