(function () {
  'use strict';

  angular
    .module('editor.ui')
    .component('gridNumericLine', {
      controller: Controller,
      templateUrl: 'app/editor/ui/survey-item/question/grid-numeric-question/grid-numeric-line/grid-numeric-line-template.html',
      bindings: {
        gridLine: '<',
      },
      require: {
        parentCtrl: '^gridNumericQuestion'
      }
    });

  Controller.$inject = [
    'WorkspaceService',
    'otusjs.model.utils.AlphabetSuffixIDGenerator'
  ];

  function Controller(WorkspaceService, AlphabetSuffixIDGenerator) {
    var self = this;
    var _questionID;

    self.$onInit = onInit;
    self.addGridNumeric = addGridNumeric;
    self.removeLastGridNumeric = removeLastGridNumeric;
    self.removeGridLine = removeGridLine;
    self.isEmpty = isEmpty;

    function onInit() {
      _questionID = self.parentCtrl.item.customID;
    }

    function addGridNumeric() {
      self.gridLine.addGridNumeric(_generateGridNumericID());
      self.parentCtrl.save();
    }

    function removeLastGridNumeric() {
      self.gridLine.removeLastGridNumeric();
      self.parentCtrl.save();
    }

    function removeGridLine(index) {
      self.parentCtrl.removeGridLine(index);
    }

    function isEmpty() {
      return self.gridLine.getGridNumericListSize() > 0 ? false : true;
    }

    function _generateGridNumericID() {
      var gridID;
      var quantity = self.gridLine.getGridNumericListSize();
      do {
        gridID = _questionID + AlphabetSuffixIDGenerator.generateSuffixByOptionsLength(quantity++);
      } while (!WorkspaceService.getSurvey().isAvailableCustomID(gridID));
      return gridID;
    }
  }

}());
