(function() {
  'use strict';

  angular
    .module('editor.ui')
    .component('miscItem', {
      templateUrl: 'app/editor/ui/survey-item/misc/misc-item-template.html',
      controller: Controller,
      bindings: {
        item: '<'
      }
    });

  Controller.$inject = [
    'SurveyItemMapFactory'
  ];

  function Controller(SurveyItemMapFactory) {
    var self = this;

    self.getTemplate = getTemplate;

    function getTemplate() {
      return SurveyItemMapFactory[self.item.objectType];
    }
  }

}());
