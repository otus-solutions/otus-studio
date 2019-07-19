(function () {
  'use strict';

  angular
    .module('resources.core')
    .factory('resources.core.RemoveStaticVariableEventFactory', RemoveStaticVariableEventFactory);

  RemoveStaticVariableEventFactory.$inject = [
    'WorkspaceService',
    'otusjs.staticVariable.RemoveStaticVariableService'
  ];

  function RemoveStaticVariableEventFactory(WorkspaceService, RemoveStaticVariableService) {
    var self = this;

    /* Public interface */
    self.create = create;

    function create() {
      return new RemoveStaticVariableEvent(WorkspaceService, RemoveStaticVariableService);
    }

    return self;
  }

  function RemoveStaticVariableEvent(WorkspaceService, RemoveStaticVariableService) {
    var self = this;

    self.execute = execute;

    function execute(variable) {
      RemoveStaticVariableService.execute(variable, WorkspaceService.getSurvey());
      WorkspaceService.saveWork();
    }
  }

}());
