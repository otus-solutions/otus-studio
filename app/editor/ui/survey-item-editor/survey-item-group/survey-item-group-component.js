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
        url: 'app/editor/ui/survey-item-editor/survey-item-group/survey-item-group-dialog-template.html',
        //header: "Excluir Questão "+self.item.customID,
        //ctrl: 'SurveyItemGroupDialogController',
        item: self.item,
        //position: WorkspaceService.getSurvey().getItems().indexOf(self.item) + 1,
        //questions: WorkspaceService.getSurvey().getItems(),
        //cancel: SurveyItemGroupService.cancelGroupEdit(),
        buttons : [
          {message:"CANCELAR",class: "md-primary md-layoutTheme-theme", action: SurveyItemGroupService.cancelGroupEdit()},
          {message:"Salvar",class: "md-primary md-raised md-layoutTheme-theme", action: SurveyItemGroupService.setUpQuestionGroup(self.item.templateID)}
        ]
      };

      DialogService.show(data)
      //SurveyItemGroupService.setUpQuestionGroup(self.item.templateID);
      //SurveyItemGroupService.cancelGroupEdit();
    }

    function _stateControl() {
      let vm = this;
      self.stateItemGroup = vm.status;
    }





  }


}());
