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
    'editor.ui.SurveyItemGroupService',
    '$scope',
    '$mdDialog',
    'DialogService'
  ];

  function Controller(SurveyItemGroupService, $scope, $mdDialog, DialogService) {
    var self = this;
    self.stateItemGroup = "createGroup";
    self.itemCandidateCheckBox = false;

    self.$onInit = onInit;
    self.editorSurveyItemGroup = editorSurveyItemGroup;
    self.setUpQuestionGroup = setUpQuestionGroup;


    function onInit() {
      SurveyItemGroupService.surveyItemsRegistry(self, _stateControl);
    }

    function editorSurveyItemGroup() {
      SurveyItemGroupService.getValidItemsByTemplateID(self.item.templateID);
      console.log(self);
    }

    function setUpQuestionGroup() {
      var data = {
        url: 'app/editor/ui/survey-item-editor/survey-item-group/item-group-dialog/survey-item-group-dialog-template.html',
        ctrl: 'SurveyItemGroupDialogController',
        item: self.item,
        //questions: WorkspaceService.getSurvey().getItems(),
        buttons : [
          {message:"CANCELAR",class: "md-primary md-layoutTheme-theme", action: _cancelGroup},
          {message:"Salvar",class: "md-primary md-raised md-layoutTheme-theme", action: _saveItemGroup}
        ]
      };
      DialogService.show(data);
    }

    function _stateControl() {
      let vm = this;
      self.stateItemGroup = vm.status;
    }

    function _saveItemGroup(){
      SurveyItemGroupService.setUpQuestionGroup(self.item.templateID);
      //_clearQuestionSelected(0);
      $mdDialog.cancel();
    }

    function _cancelGroup(){
      console.log("_cancel")
      SurveyItemGroupService.cancelGroupEdit();
      $mdDialog.cancel();
    }
  }

}());
