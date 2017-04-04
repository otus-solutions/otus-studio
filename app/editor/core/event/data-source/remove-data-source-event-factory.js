(function() {
  'use strict';

  angular
    .module('editor.core')
    .factory('RemoveDataSourceEventFactory', RemoveDataSourceEventFactory);

  RemoveDataSourceEventFactory.$inject = [
    'WorkspaceService'
  ];

  function RemoveDataSourceEventFactory(WorkspaceService) {
    var self = this;

    /* Public interface */
    self.create = create;

    function create() {
      return new RemoveDataSourceEvent(WorkspaceService);
    }

    return self;
  }

  function RemoveDataSourceEvent(WorkspaceService) {
    var self = this;

    self.execute = execute;

    function execute(item, name) {
      WorkspaceService.workspace.isdb.userEdits.store(self);
      WorkspaceService.getSurvey().getDataSource(name).removeBind(item.templateID);
      WorkspaceService.saveWork();
    }
  }

}());
