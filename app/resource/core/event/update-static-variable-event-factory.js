(function () {
  'use strict';

  angular
    .module('resources.core')
    .factory('resources.core.UpdateStaticVariableEventFactory', UpdateStaticVariableEventFactory);

  UpdateStaticVariableEventFactory.$inject = [
    'WorkspaceService',
    'otusjs.staticVariable.UpdateStaticVariableService'
  ];

  function UpdateStaticVariableEventFactory(WorkspaceService, UpdateStaticVariableService) {
    var self = this;

    /* Public interface */
    self.create = create;

    function create() {
      return new UpdateStaticVariableEvent(WorkspaceService, UpdateStaticVariableService);
    }

    return self;
  }

  function UpdateStaticVariableEvent(WorkspaceService, UpdateStaticVariableService) {
    var self = this;

    self.execute = execute;

    function execute(index, variable) {
      console.log(WorkspaceService.getSurvey());
      UpdateStaticVariableService.execute(WorkspaceService.getSurvey(), index, variable);
      WorkspaceService.saveWork();
    }
  }

}());
