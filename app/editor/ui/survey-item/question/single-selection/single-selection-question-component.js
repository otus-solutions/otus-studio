(function() {
  'use strict';

  angular
    .module('editor.ui')
    .component('singleSelectionQuestion', {
      templateUrl: 'app/editor/ui/survey-item/question/single-selection/single-selection-question-template.html',
      controller: Controller,
      bindings: {
        item: '<'
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

    function onInit() {}

    function addOption() {
      self.item.createOption();
      _save();
    }

    function removeLastOption() {
      self.item.removeLastOption();
      _save();
    }

    function isAvailableExtractionValue($event) {
      return self.item.isAvailableExtractionValue($event.newValue);
    }

    function _save() {
      WorkspaceService.saveWork();
    }
  }

}());
