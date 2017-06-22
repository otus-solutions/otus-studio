(function() {
  'use strict';

  angular
    .module('editor.ui')
    .component('gridTextQuestion', {
      controller: Controller,
      templateUrl: 'app/editor/ui/survey-item/question/grid-text-question/grid-text-question-template.html'
    });

  Controller.$inject = [
    '$scope',
    '$element',
    'GridTextQuestionWidgetFactory',
    'UpdateQuestionEventFactory'
  ];

  function Controller($scope, $element, GridTextQuestionWidgetFactory, UpdateQuestionEventFactory) {
    var self = this;
    var _item;

    self.$onInit = onInit;
    self.addGridLine = addGridLine;
    self.removeGridLine = removeGridLine;
    self.save = save;

    function onInit() {
      self.widget = GridTextQuestionWidgetFactory.create($scope, $element);
      _item = self.widget.getItem();
    };

    function addGridLine() {
      _item.createLine();
      self.save();
    }

    function removeGridLine(gridLineIndex) {
      _item.removeLine(gridLineIndex);
      self.save();
    }

    function save() {
      UpdateQuestionEventFactory.create().execute(self);
    }
  }

}());
