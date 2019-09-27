(function() {
  'use strict';

  angular
    .module('editor.core')
    .factory('AddDataSourceEventFactory', AddDataSourceEventFactory);

  AddDataSourceEventFactory.$inject = [
    'WorkspaceService'
  ];

  function AddDataSourceEventFactory(WorkspaceService) {
    var self = this;

    /* Public interface */
    self.create = create;

    function create() {
      return new AddDataSourceEvent(WorkspaceService);
    }

    return self;
  }

  function AddDataSourceEvent(WorkspaceService) {
    var self = this;

    self.execute = execute;

    function execute(item, name) {
      WorkspaceService.workspace.isdb.userEdits.store(self);
      WorkspaceService.getSurvey().getDataSource(name).performBind(item.templateID);
      WorkspaceService.saveWork();
    }
  }

}());
