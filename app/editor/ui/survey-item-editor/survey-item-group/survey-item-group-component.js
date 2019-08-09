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
    self.editorItemGroup = true;
    self.stateItemGroup = "createGroup";
    self.stateItemGroup2 = "T";

    self.editorSurveyItemGroup = editorSurveyItemGroup;

    SurveyItemGroupService.surveyItemsRegistry(self.item.templateID, _stateControl);

    function editorSurveyItemGroup() {
      SurveyItemGroupService.click(self.item.templateID);
    }

    function _stateControl() {
      let vm = this;
      self.stateItemGroup = vm.state;
      console.log(self)
    }
  }

}());
