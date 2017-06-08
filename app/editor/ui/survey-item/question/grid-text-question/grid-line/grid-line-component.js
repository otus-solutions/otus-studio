(function() {
  'use strict';

  angular
    .module('editor.ui')
    .component('gridLine', {
      controller: Controller,
      templateUrl: 'app/editor/ui/survey-item/question/grid-text-question/grid-line/grid-line-template.html',
      bindings: {
        gridLine: '<',
      },
      require: {
        parentCtrl: '^gridTextQuestion'
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
    self.addGridText = addGridText;
    self.removeLastGridText = removeLastGridText;
    self.removeGridLine = removeGridLine;
    self.isEmpty = isEmpty;

    function onInit() {
      _questionID = self.parentCtrl.widget.getItem().customID;
    }

    function addGridText() {
      self.gridLine.addGridText(_generateGridTextID());
      self.parentCtrl.save();
    }

    function removeLastGridText() {
      self.gridLine.removeLastGridText();
      self.parentCtrl.save();
    }

    function removeGridLine(index) {
      self.parentCtrl.removeGridLine(index);
    }

    function isEmpty() {
      return self.gridLine.getGridTextListSize() > 0 ? false : true;
    }

    function _generateGridTextID() {
      var gridID;
      var quantity = self.gridLine.getGridTextListSize();
      do {
        gridID = _questionID + AlphabetSuffixIDGenerator.generateSuffixByOptionsLength(quantity++);
      } while (!WorkspaceService.getSurvey().isAvailableCustomID(gridID));
      return gridID;
    }
  }

}());
