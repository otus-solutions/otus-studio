//interation 134 - is only injected into FileUploadQuestionWidgetFactory but is not being used
(function() {
  'use strict';

  angular
    .module('editor.core')
    .factory('RemoveFileUploadEventFactory', RemoveFileUploadEventFactory);

  RemoveFileUploadEventFactory.$inject = [
    'WorkspaceService'
  ];

  function RemoveFileUploadEventFactory(WorkspaceService) {
    var self = this;

    /* Public interface */
    self.create = create;

    function create() {
      return new RemoveFileUploadEvent(WorkspaceService);
    }

    return self;
  }

  function RemoveFileUploadEvent(WorkspaceService) {
    var self = this;

    self.execute = execute;

    function execute(item, name) {
      WorkspaceService.workspace.isdb.userEdits.store(self);
      WorkspaceService.getSurvey().getFileUpload(name).removeBind(item.templateID);
      WorkspaceService.saveWork();
    }
  }

}());
