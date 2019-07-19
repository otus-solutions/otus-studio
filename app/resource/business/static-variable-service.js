(function () {
  'use strict';

  angular
    .module('resources.business')
    .service('resources.business.StaticVariableService', Service);

  Service.$inject = [
    'WorkspaceService',
    'resources.core.AddStaticVariableEventFactory',
    'resources.core.RemoveStaticVariableEventFactory',
    'resources.core.UpdateStaticVariableEventFactory'
  ];

  function Service(WorkspaceService, AddStaticVariableEventFactory, RemoveStaticVariableEventFactory, UpdateStaticVariableEventFactory) {
    var self = this;

    /* Public methods */
    self.createStructureToStaticVariable = createStructureToStaticVariable;
    self.createVariable = createVariable;
    self.removeVariable = removeVariable;
    self.updateVariable = updateVariable;
    self.getStaticVariableList = getStaticVariableList;

    function createStructureToStaticVariable() {
      WorkspaceService.getSurvey().createStaticVariable();
    }

    function createVariable(variable) {
      AddStaticVariableEventFactory.create().execute(variable);
      console.log(WorkspaceService.getSurvey());
    }

    function removeVariable(variable) {
      RemoveStaticVariableEventFactory.create().execute(variable);
    }

    function updateVariable(variable) {
      UpdateStaticVariableEventFactory.create().execute(variable);
    }

    function getStaticVariableList() {
      if (WorkspaceService.getSurvey().StaticVariableManager)
        return WorkspaceService.getSurvey().StaticVariableManager.getStaticVariableList();
      else
        return [];
    }

  }
})();
