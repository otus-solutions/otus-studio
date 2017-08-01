(function() {
  'use strict';

  angular
    .module('editor.ui')
    .component('otusSurveyItemEditor', {
      templateUrl: 'app/editor/ui/survey-item-editor/survey-item-editor.html',
      controller: Controller,
      bindings: {
        item: '<'
      }
    });

  Controller.$inject = [
    'RemoveSurveyItemEventFactory'
  ];

  function Controller(RemoveSurveyItemEventFactory) {
    var self = this;
    // lifecycle hooks
    self.$onInit = onInit;
    // public methods
    self.getItem = getItem;
    self.deleteSurveyItem = deleteSurveyItem;
    self.getQuestionId = getQuestionId;

    function onInit() {}

    function getItem() {
      return self.item;
    }

    function getQuestionId() {
      return self.getItem().templateID;
    }

    function deleteSurveyItem() {
      RemoveSurveyItemEventFactory.create().execute(self.item);
    }
  }

}());
