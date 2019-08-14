(function () {
  'use strict';

  angular.module('editor.ui')
    .component('itemGroupType', {
      templateUrl: 'app/editor/ui/survey-item-editor/survey-item-group/item-group-type/item-group-type-template.html',
      controller: 'itemGroupTypeCtrl as $ctrl',
      bindings: {
        type:'@',
        stateItemGroup:'@',
        id:'@',
        iconButton:'@',
        click: '&',
        tooltip: '@',
        itemCandidateCheck: '='
      }
    })
    .controller('itemGroupTypeCtrl', Controller);

  Controller.$inject = [
    // 'editor.ui.SurveyItemGroupService',

  ];

  function Controller(SurveyItemGroupService) {
    var self = this;

  //   self.stateItemGroup = "createGroup";
  //    self.itemCandidateCheck = true;
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
