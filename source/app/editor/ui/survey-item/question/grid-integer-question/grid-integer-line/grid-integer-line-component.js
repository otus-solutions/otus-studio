(function () {
  'use strict';

  angular
    .module('editor.ui')
    .component('gridIntegerLine', {
      controller: Controller,
      templateUrl: 'app/editor/ui/survey-item/question/grid-integer-question/grid-integer-line/grid-integer-line-template.html',
      bindings: {
        gridLine: '<',
      },
      require: {
        parentCtrl: '^gridIntegerQuestion'
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
    self.addGridInteger = addGridInteger;
    self.removeLastGridInteger = removeLastGridInteger;
    self.removeGridLine = removeGridLine;
    self.isEmpty = isEmpty;

    function onInit() {
      _questionID = self.parentCtrl.item.customID;
    }

    function addGridInteger() {
      self.gridLine.addGridInteger(_generateGridIntegerID());
      self.parentCtrl.save();
    }

    function removeLastGridInteger() {
      self.gridLine.removeLastGridInteger();
      self.parentCtrl.save();
    }

    function removeGridLine(index) {
      self.parentCtrl.removeGridLine(index);
    }

    function isEmpty() {
      return self.gridLine.getGridIntegerListSize() > 0 ? false : true;
    }

    function _generateGridIntegerID() {
      var gridID;
      var quantity = self.gridLine.getGridIntegerListSize();
      do {
        gridID = _questionID + AlphabetSuffixIDGenerator.generateSuffixByOptionsLength(quantity++);
      } while (!WorkspaceService.getSurvey().isAvailableCustomID(gridID));
      return gridID;
    }
  }

}());
