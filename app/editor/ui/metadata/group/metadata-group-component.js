(function() {
  'use strict';

  angular
    .module('editor.ui')
    .component('otusMetadataGroup', {
      templateUrl: 'app/editor/ui/metadata/group/metadata-group-template.html',
      controller: Controller,
      bindings: {
        metadata: '<'
      }
    });

  Controller.$inject = ['WorkspaceService']

  function Controller(WorkspaceService) {
    var self = this;
    // lifecycle hooks
    self.$onInit = onInit;
    // public methods
    self.addOption = addOption;
    self.removeLastOption = removeLastOption;
    self.isAvailableExtractionValue = isAvailableExtractionValue;

    function onInit() {}

    function addOption() {
      self.metadata.createOption();
      _save();
    }

    function removeLastOption() {
      self.metadata.removeLastOption();
      _save();
    }

    function isAvailableExtractionValue($event) {
      return self.metadata.isAvailableExtractionValue($event.newValue);
    }

    function _save() {
      WorkspaceService.saveWork();
    }
  }

}());
