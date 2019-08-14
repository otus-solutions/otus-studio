(function () {
  'use strict';

  angular.module('editor.ui')
    .component('itemGroupButton', {
      templateUrl: 'app/editor/ui/survey-item-editor/survey-item-group/item-group-button/item-group-button-template.html',
      controller: 'itemGroupButtonCtrl as $ctrl',
      bindings: {
        stateItemGroup:'@',
        id:'@',
        buttonClass: '@',
        iconButton:'@',
        iconCollor:'@',
        colorIcon:'@',
        click: '&',
        tooltip: '@',
        colorButton:'@',
      }
    })
    .controller('itemGroupButtonCtrl', Controller);

  Controller.$inject = [
    // 'editor.ui.SurveyItemGroupService',

  ];

  function Controller(SurveyItemGroupService) {
    var self = this;
    self.buttonClass = "md-primary md-fab md-mini questionPositionChip";
  //   self.stateItemGroup = "createGroup";
  //   self.itemCandidateCheckBox = false;
  //
  //   self.$onInit = onInit;
  //   self.editorSurveyItemGroup = editorSurveyItemGroup;
  //   self.setUpQuestionGroup = setUpQuestionGroup;
  //   self.cancelGroupEdit =  cancelGroupEdit;
  //
  //
  //   function onInit() {
  //     SurveyItemGroupService.surveyItemsRegistry(self, _stateControl);
  //   }
  //
  //   function editorSurveyItemGroup() {
  //     SurveyItemGroupService.getValidItemsByTemplateID(self.item.templateID);
  //     console.log(self);
  //   }
  //
  //   function setUpQuestionGroup() {
  //     SurveyItemGroupService.setUpQuestionGroup(self.item.templateID);
  //   }
  //
  //   function _stateControl() {
  //     let vm = this;
  //     self.stateItemGroup = vm.status;
  //   }
  //
  //   function cancelGroupEdit(){
  //     SurveyItemGroupService.cancelGroupEdit();
  //
  //   }
  }

}());
