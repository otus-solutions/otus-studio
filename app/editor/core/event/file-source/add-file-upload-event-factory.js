(function() {
  'use strict';

  angular
    .module('editor.core')
    .factory('AddFileUploadEventFactory', AddFileUploadEventFactory);

  AddFileUploadEventFactory.$inject = [
    'WorkspaceService'
  ];

  function AddFileUploadEventFactory(WorkspaceService) {
    var self = this;

    /* Public interface */
    self.create = create;

    function create() {
      return new AddFileUploadEvent(WorkspaceService);
    }

    return self;
  }

  function AddFileUploadEvent(WorkspaceService) {
    var self = this;

    self.execute = execute;

    function execute(item, name) {
      WorkspaceService.workspace.isdb.userEdits.store(self);
      WorkspaceService.getSurvey().getFileUpload(name).performBind(item.templateID);
      WorkspaceService.saveWork();
    }
  }

}());
