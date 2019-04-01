(function() {
  'use strict';

  angular
    .module('editor.ui')
    .component('otusSurveyItemEditor', {
      templateUrl: 'app/editor/ui/survey-item-editor/survey-item-editor.html',
      controller: Controller,
      bindings: {
        item: '<',
        position: '<'
      }
    });

  function Controller() {
    var self = this;
    // lifecycle hooks
    self.$onInit = onInit;
    // public methods
    self.getItem = getItem;
    self.getQuestionId = getQuestionId;

    function onInit() {}

    function getItem() {
      return self.item;
    }

    function getQuestionId() {
      return self.getItem().templateID;
    }

  }

}());
