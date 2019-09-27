(function() {
  'use strict';

  angular
    .module('editor.ui')
    .component('otusQuestionItem', {
      templateUrl: 'app/editor/ui/survey-item/question/question-template.html',
      controller: Controller,
      bindings: {
        item: '<'
      }
    });

  Controller.$inject = [
    'SurveyItemMapFactory',
  ];

  function Controller(SurveyItemMapFactory) {
    var self = this;
    var widgetFactories;
    // lifecycle hooks
    self.$onInit = onInit;
    // public methods
    self.getTemplate = getTemplate;

    function onInit() {}

    function getTemplate() {
      return SurveyItemMapFactory[self.item.objectType];
    }

  }

}());
