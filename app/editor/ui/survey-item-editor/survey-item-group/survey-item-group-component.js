(function () {
  'use strict';

  angular.module('editor.ui')
    .component('surveyItemGroup', {
      templateUrl: 'app/editor/ui/survey-item-editor/survey-item-group/survey-item-group-template.html',
      controller: 'otusSurveyItemGroupCtrl as $ctrl',
      bindings: {
        item: "<",
      }
    })
    .controller('otusSurveyItemGroupCtrl', Controller);

  Controller.$inject = [
    'SurveyItemGroupService',
    '$scope',
    '$mdDialog',
    'DialogService',
  ];

  function Controller(SurveyItemGroupService, $scope, $mdDialog, DialogService) {
    var self = this;
    self.stateItemGroup = "createGroup";
    self.itemCandidateCheckbox = false;

    self.$onInit = onInit;
    self.editorSurveyItemGroup = editorSurveyItemGroup;
    self.setUpQuestionGroup = setUpQuestionGroup;
    self.flagsStatusGroupItems = flagsStatusGroupItems;

    function onInit() {
      SurveyItemGroupService.surveyItemsRegistry(self, _stateControl);
      flagsStatusGroupItems();
    }

    function editorSurveyItemGroup() {
      SurveyItemGroupService.getValidItemsByTemplateID(self.item.templateID);

    }

    function flagsStatusGroupItems(){
      var itemStartGroup = _checkEndItemGroup();
      if(itemStartGroup){
        SurveyItemGroupService.identifiesGroupItemStatus(itemStartGroup.id)
      }
    }

    function _checkEndItemGroup(){
      if(SurveyItemGroupService.verifyEndItemGroup(self.item.templateID))
        return {id: self.item.templateID};
    }

    function setUpQuestionGroup() {
      var data = {
        url: 'app/editor/ui/survey-item-editor/survey-item-group/item-group-dialog/survey-item-group-dialog-template.html',
        ctrl: 'SurveyItemGroupDialogController',
        item: self.item,
        buttons : [
          {message:"CANCELAR",class: "md-primary md-layoutTheme-theme", action: _cancelGroup},
          {message:"Salvar",class: "md-primary md-raised md-layoutTheme-theme", action: _saveItemGroup}
        ]
      };

      _taggedItemList().length >= 1 ?  DialogService.show(data) : console.log("não marcou")
    }

    function _stateControl() {
      let vm = this;
      self.stateItemGroup = vm.status;
    }

    function _saveItemGroup(){
      SurveyItemGroupService.saveItemGroup(self.item.templateID);
      $mdDialog.cancel();
    }

    function _cancelGroup(){
      console.log("_cancel")
      SurveyItemGroupService.cancelGroupEdit();
      $mdDialog.cancel();
    }

    function _taggedItemList(){
      var taggedItems = SurveyItemGroupService.futureQuestionItemGroup.filter(item =>{
        return item.ctrl.itemCandidateCheckbox == true
      })
      return taggedItems;
    }
  }

}());
