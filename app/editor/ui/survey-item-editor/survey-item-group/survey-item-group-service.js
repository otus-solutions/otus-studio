(function () {
  'use strict';

  angular
    .module('editor.ui')
    .service('SurveyItemGroupService', Service);

  Service.$inject = ['WorkspaceService', 'AddSurveyItemGroupEventFactory']

  function Service(WorkspaceService, AddSurveyItemGroupEventFactory) {
    //state of group component scenarios
    const CREATE_ITEM_GROUP_STATE = "createGroup";
    const EDITOR_GROUP_STATE = "editorGroup";
    const VALID_ITEM_GROUP_STATE = "validateGroup";
    const SAVED_ITEM_GROUP_EDITOR_STATE = "savedGroupEditor";
    const SAVED_ITEM_GROUP_STATE = "savedGroupItem";
    const LAST_SAVED_ITEM_GROUP_STATE = "lastSavedGroupItem";

    var self = this;
    var groupManager = {};
    self.questionItemReference = {};
    self.futureQuestionItemGroup = [];
    self.surveyItemsRegistry = surveyItemsRegistry;
    self.getValidItemsByTemplateID = getValidItemsByTemplateID;
    self.saveItemGroup = saveItemGroup;
    self.cancelGroupEdit = cancelGroupEdit;
    self.verifyEndItemGroup = verifyEndItemGroup;
    self.identifiesGroupItemStatus = identifiesGroupItemStatus;

    onInit();

    function onInit() {
      let survey = WorkspaceService.getSurvey();
      groupManager = survey.SurveyItemGroupManager;
      //console.log(groupManager);
    }

    function surveyItemsRegistry(ctrl, fun) {
      self.questionItemReference[ctrl.item.templateID] = {};
      self.questionItemReference[ctrl.item.templateID].stateControl = fun;
      self.questionItemReference[ctrl.item.templateID].item = ctrl.item;
      self.questionItemReference[ctrl.item.templateID].ctrl = ctrl;
    }

    function getValidItemsByTemplateID(templateId) {
      let stateComponent = {};
      self.itemsValidCanditates = groupManager.getGroupCandidates(templateId);
      if(!self.itemsValidCanditates.length){
        stateComponent.status = VALID_ITEM_GROUP_STATE;
        _setStateComponent(templateId, stateComponent);
      }else{
        self.itemsValidCanditates.forEach(function (id, index) {
          if(index < 1)stateComponent.status = EDITOR_GROUP_STATE;
          else stateComponent.status = VALID_ITEM_GROUP_STATE;
          _setStateComponent(id,stateComponent);
        });
      }
    }

    function verifyEndItemGroup(id){
      var surveyItemGroup = groupManager.getGroupByMember(id);
      if(surveyItemGroup) return surveyItemGroup.end === id ;
    }

    function identifiesGroupItemStatus(id){

      // var statusItem = {};
      //
      var surveyItemGroup = groupManager.getGroupByMember(id);
      console.log(surveyItemGroup);
      self.questionItemReference[surveyItemGroup.start].ctrl.stateItemGroup = SAVED_ITEM_GROUP_EDITOR_STATE;
      self.questionItemReference[surveyItemGroup.end].ctrl.stateItemGroup = LAST_SAVED_ITEM_GROUP_STATE;
      //surveyItemGroup.members.forEach()


      //
      // if(surveyItemGroup.start === id) {
      //   console.log("teste")
        // if(surveyItemGroup.start === id) self.questionItemReference[id].ctrl.stateItemGroup = SAVED_ITEM_GROUP_EDITOR_STATE;
        // if(surveyItemGroup.end === id) self.questionItemReference[id].ctrl.stateItemGroup = LAST_SAVED_ITEM_GROUP_STATE;
      //}

      // if(surveyItemGroup.members instanceof Array){
      //   console.log("teste");
      // }

      //

      //if(surveyItemGroupList.length > 0){
      //
      //   surveyItemGroupList.forEach(itemGroup => {
      //     console.log(itemGroup);
      //   });
      // }

      // surveyItemGroupList.forEach(itemGroup => {
      //   statusItem = itemGroup.members.find(member => {
      //     return member.id.id === id;
      //   });
      // });

      //var surveyItemGroupList = groupManager.getGroupByMember(id);
      // console.log(surveyItemGroupList)
      //   statusItem = groupManager.getGroupByMember(id)
      //     .members.find(member => member.id.id === id);

      //if undefined...


      // if(statusItem){
      //   //console.log(statusItem)
      //   switch (statusItem.position) {
      //     case "start":
      //       self.questionItemReference[id].ctrl.stateItemGroup = SAVED_ITEM_GROUP_EDITOR_STATE;
      //       break;
      //     case "middle":
      //       self.questionItemReference[id].ctrl.stateItemGroup = SAVED_ITEM_GROUP_STATE;
      //       break;
      //     case "end":
      //       self.questionItemReference[id].ctrl.stateItemGroup = LAST_SAVED_ITEM_GROUP_STATE;
      //       break;
      //    }
      //  }
    }


    function saveItemGroup(id){
      let groupSurveyItems = [];
      if(self.questionItemReference[id].ctrl.stateItemGroup == EDITOR_GROUP_STATE){
        groupSurveyItems.push(self.questionItemReference[id].item.templateID);
        self.itemsValidCanditates.forEach(itemCandidate => {
          if(
            self.questionItemReference[itemCandidate].ctrl.stateItemGroup == VALID_ITEM_GROUP_STATE &&
            self.questionItemReference[itemCandidate].ctrl.itemCandidateCheckbox){
            groupSurveyItems.push(self.questionItemReference[itemCandidate].item.templateID);
          }
          else if(self.questionItemReference[itemCandidate].ctrl.stateItemGroup == VALID_ITEM_GROUP_STATE &&
            !self.questionItemReference[itemCandidate].ctrl.itemCandidateCheckbox){
            self.questionItemReference[itemCandidate].ctrl.stateItemGroup = CREATE_ITEM_GROUP_STATE;
          }
        });
      }
      groupManager.createGroup(groupSurveyItems);
      AddSurveyItemGroupEventFactory.create().execute();
    }

    function cancelGroupEdit() {
      self.itemsValidCanditates.forEach(itemCandidate =>{
        self.questionItemReference[itemCandidate].ctrl.stateItemGroup = CREATE_ITEM_GROUP_STATE;
      });
      self.itemsValidCanditates = [];
    }

    function _setStateComponent(id, stateComponent){
      self.questionItemReference[id].stateControl.call(stateComponent)
      self.futureQuestionItemGroup.push(self.questionItemReference[id]);
    }
    return self;
  }
}());
