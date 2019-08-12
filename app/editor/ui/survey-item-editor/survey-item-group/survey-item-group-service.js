(function () {
  'use strict';

  angular
    .module('editor.ui')
    .service('editor.ui.SurveyItemGroupService', Service);

  function Service() {
    var self = this;

    self.questionItemReference = {};
    self.surveyItemsRegistry = surveyItemsRegistry;
    self.getValidItemsByTemplateID = getValidItemsByTemplateID;
    self.setUpQuestionGroup = setUpQuestionGroup;
    self.cancelGroupEdit = cancelGroupEdit;

    function surveyItemsRegistry(ctrl, fun) {
      self.questionItemReference[ctrl.item.templateID] = {};
      self.questionItemReference[ctrl.item.templateID].stateControl = fun;
      self.questionItemReference[ctrl.item.templateID].item = ctrl.item;
      self.questionItemReference[ctrl.item.templateID].ctrl = ctrl;
    }

    function getValidItemsByTemplateID(templateId) {
      let stateComponent = {};
      self.itemsValidCanditates = self.fakeModelList_getItemsValidCandidates(templateId);

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

    function setUpQuestionGroup(id){
      let taggedValidateGroupItem = false;
      if(self.questionItemReference[id].ctrl.stateItemGroup == "editorGroup"){
        var groupSurveyItems = [];
        groupSurveyItems.push(self.questionItemReference[id].item.templateID);
        self.itemsValidCanditates.forEach(itemCandidate => {
          if(
            self.questionItemReference[itemCandidate].ctrl.stateItemGroup == "validateGroup" &&
            self.questionItemReference[itemCandidate].ctrl.itemCandidateCheckBox){
            taggedValidateGroupItem = true;
            groupSurveyItems.push(self.questionItemReference[itemCandidate].item.templateID);
            self.questionItemReference[id].ctrl.stateItemGroup = "savedGroupEditor"
            self.questionItemReference[itemCandidate].ctrl.stateItemGroup = "savedGroupItem"
          }
        });
        if(taggedValidateGroupItem){
          console.log(groupSurveyItems);
        };
      }
    }

    function cancelGroupEdit() {
      self.itemsValidCanditates.forEach(itemCandidate =>{
        self.questionItemReference[itemCandidate].ctrl.stateItemGroup = "createGroup"
      })
      self.itemsValidCanditates = [];
    }


    function _setStateComponent(id, stateComponent){
      self.questionItemReference[id].stateControl.call(stateComponent)
    }

    self.fakeModelList_getItemsValidCandidates = function (templateId) {
      switch (templateId) {
        case "FDR1":
          return [
            'FDR1',
            'FDR3'
          ];
          break;

        case "FDR4":
          return [
            'FDR4',
            'FDR5',
            'FDR6',
          ];
          break;

        default:
          return [];
          break;
      }
    };
    return self;
  }
}());
