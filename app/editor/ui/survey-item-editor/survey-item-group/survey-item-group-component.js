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
    self.stateItemGroup = "createGroup";
    self.itemCandidateCheckBox = false;

    self.$onInit = onInit;
    self.editorSurveyItemGroup = editorSurveyItemGroup;
    self.setUpQuestionGroup = setUpQuestionGroup;
    self.cancelGroupEdit =  cancelGroupEdit;


    function onInit() {
      SurveyItemGroupService.surveyItemsRegistry(self, _stateControl);
    }

    function editorSurveyItemGroup() {
      SurveyItemGroupService.getValidItemsByTemplateID(self.item.templateID);
      console.log(self);
    }

    function setUpQuestionGroup() {
      SurveyItemGroupService.setUpQuestionGroup(self.item.templateID);
    }

    function _stateControl() {
      let vm = this;
      self.stateItemGroup = vm.status;
    }

    function cancelGroupEdit(){
      SurveyItemGroupService.cancelGroupEdit();

    }
  }


}());
