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
    self.$onInit = onInit;

    function onInit() {
      WorkspaceService.getSurvey().createStaticVariable();
    }

  }
})();
