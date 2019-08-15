(function () {
  'use strict';

  angular
    .module('editor.ui')
    .service('editor.ui.SurveyItemGroupService', Service);

  Service.$inject = ['WorkspaceService']

  function Service(WorkspaceService) {

    var self = this;
    var groupManager = {}
    self.questionItemReference = {};
    self.surveyItemsRegistry = surveyItemsRegistry;
    self.getValidItemsByTemplateID = getValidItemsByTemplateID;
    self.setUpQuestionGroup = setUpQuestionGroup;
    self.cancelGroupEdit = cancelGroupEdit;
    init()

    function init() {
      let survey = WorkspaceService.getSurvey();
      groupManager = survey.SurveyItemGroupManager;
      console.log(groupManager);

      //console.log(candidates);
      //console.log(groupManager.createGroup(candidates));
      //console.log(groupManager.getSurveyItemGroupList());
    }

    function surveyItemsRegistry(ctrl, fun) {
      self.questionItemReference[ctrl.item.templateID] = {};
      self.questionItemReference[ctrl.item.templateID].stateControl = fun;
      self.questionItemReference[ctrl.item.templateID].item = ctrl.item;
      self.questionItemReference[ctrl.item.templateID].ctrl = ctrl;
    }

    function getValidItemsByTemplateID(templateId) {
      // var realItemsValidCanditates = groupManager.getGroupCandidates(templateId);
      // console.log(realItemsValidCanditates);
      let stateComponent = {};
      //self.itemsValidCanditates = self.fakeModelList_getItemsValidCandidates(templateId);
      self.itemsValidCanditates = groupManager.getGroupCandidates(templateId);
      console.log(self.itemsValidCanditates);

      if(!self.itemsValidCanditates.length){
        stateComponent.status = "invalidateGroup";
        _setStateComponent(templateId, stateComponent);
      }else{
        self.itemsValidCanditates.forEach(function (id, index) {
          if(index < 1)stateComponent.status = "editorGroup";
          else stateComponent.status = "validateGroup";
          _setStateComponent(id,stateComponent);
        });
      }
    }

    function setUpQuestionGroup(id, idx){
      let taggedValidateGroupItem = false;
      if(self.questionItemReference[id].ctrl.stateItemGroup == "editorGroup"){
        var groupSurveyItems = [];
        groupSurveyItems.push(self.questionItemReference[id].item.templateID);
        self.itemsValidCanditates.forEach(itemCandidate => {
          if(
            self.questionItemReference[itemCandidate].ctrl.stateItemGroup == "validateGroup" &&
            self.questionItemReference[itemCandidate].ctrl.itemCandidateCheckbox){
            taggedValidateGroupItem = true;
            groupSurveyItems.push(self.questionItemReference[itemCandidate].item.templateID);
            self.questionItemReference[id].ctrl.stateItemGroup = "savedGroupEditor"
            self.questionItemReference[itemCandidate].ctrl.stateItemGroup = "savedGroupItem"
          }
        });
        var last = groupSurveyItems[groupSurveyItems.length -1];
        self.questionItemReference[last].ctrl.stateItemGroup = "lastSavedGroupItem"

        if(taggedValidateGroupItem){
          console.log(groupSurveyItems);
        };
      }
    }

    function cancelGroupEdit() {
      console.log("cancel");
      self.itemsValidCanditates.forEach(itemCandidate =>{
        self.questionItemReference[itemCandidate].ctrl.stateItemGroup = "createGroup"
      })
      self.itemsValidCanditates = [];
    }

    function _setStateComponent(id, stateComponent){
      self.questionItemReference[id].stateControl.call(stateComponent)
    }

    // self.fakeModelList_getItemsValidCandidates = function (templateId) {
    //   switch (templateId) {
    //     case "FDR1":
    //       return [
    //         'FDR1',
    //         'FDR3',
    //         'FDR4'
    //       ];
    //       break;
    //
    //     case "FDR5":
    //       return [
    //         'FDR5',
    //         'FDR6',
    //         'FDR7',
    //         'FDR8'
    //       ];
    //       break;
    //
    //     default:
    //       return [];
    //       break;
    //   }
    // };
    return self;
  }
}());
