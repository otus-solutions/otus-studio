(function () {
  'use strict';

  angular.module('editor.ui')
    .component('surveyItemGroup', {
      templateUrl: 'app/editor/ui/survey-item-editor/survey-item-group/survey-item-group-template.html',
      controller: 'otusSurveyItemGroupCtrl as $ctrl',
      bindings: {
        item: "<"
      }
    })
    .controller('otusSurveyItemGroupCtrl', Controller);

  Controller.$inject = [
    'editor.ui.SurveyItemGroupService'
  ];

  function Controller(SurveyItemGroupService) {
    var self = this;

    self.editorSurveyItemGroup = editorSurveyItemGroup;

    SurveyItemGroupService.onClick(self.item.templateID, desabilityBottom);
    function desabilityBottom() {
      self.group = true;
    }

    function editorSurveyItemGroup() {
      SurveyItemGroupService.click();
    }
  }

}());
