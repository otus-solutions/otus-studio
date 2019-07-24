(function () {
  'use strict';

  angular
    .module('resources.core')
    .factory('resources.core.RemoveStaticVariableEventFactory', RemoveStaticVariableEventFactory);

  RemoveStaticVariableEventFactory.$inject = [
    'WorkspaceService',
    'otusjs.staticVariable.RemoveStaticVariableTaskService'
  ];

  function RemoveStaticVariableEventFactory(WorkspaceService, RemoveStaticVariableTaskService) {
    var self = this;

    /* Public interface */
    self.create = create;

    function create() {
      return new RemoveStaticVariableEvent(WorkspaceService, RemoveStaticVariableTaskService);
    }

    return self;
  }

  function RemoveStaticVariableEvent(WorkspaceService, RemoveStaticVariableTaskService) {
    var self = this;

    self.execute = execute;

    function execute(index) {
      RemoveStaticVariableTaskService.execute(WorkspaceService.getSurvey(), index);
      WorkspaceService.saveWork();
    }
  }

}());
