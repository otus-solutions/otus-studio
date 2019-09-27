(function() {
  'use strict';

  angular
    .module('editor.ui')
    .component('checkboxQuestion', {
      templateUrl: 'app/editor/ui/survey-item/question/checkbox/checkbox-question-template.html',
      controller: Controller,
      bindings: {
        item: '<'
      }
    });

  Controller.$inject = [
    'WorkspaceService',
    'otusjs.model.utils.AlphabetSuffixIDGenerator',
  ]

  function Controller(WorkspaceService, AlphabetSuffixIDGenerator) {

    var self = this;
    // lifecycle hooks
    self.$onInit = onInit;
    // public methods
    self.addOption = addOption;
    self.removeLastOption = removeLastOption;

    function onInit() {}

    function addOption() {
      self.item.createOption(_generateOptionId());
      _save();
    }

    function removeLastOption() {
      self.item.removeLastOption();
      _save();
    }

    function _save() {
      WorkspaceService.saveWork();
    }

    function _generateOptionId() {
        var checkboxID;
        var quantity = self.item.options.length;
        do {
            checkboxID = self.item.customID + AlphabetSuffixIDGenerator.generateSuffixByOptionsLength(quantity++);
        } while (!WorkspaceService.getSurvey().isAvailableCustomID(checkboxID));
        return checkboxID;
    }
  }

}());
