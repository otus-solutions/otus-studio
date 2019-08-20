(function () {
  'use strict';
  angular
    .module('editor.ui')
    .service('SurveyItemGroupService', Service);

  Service.$inject = [
    'WorkspaceService',
    'AddSurveyItemGroupEventFactory',
    '$mdDialog',
    'DialogService'
  ]

  function Service(WorkspaceService, AddSurveyItemGroupEventFactory, $mdDialog, DialogService) {
    //state of group component scenarios
    const CREATE_ITEM_GROUP_STATE = "createGroup";
    const EDITOR_GROUP_STATE = "editorGroup";
    const VALID_ITEM_GROUP_STATE = "validateGroup";
    const INVALID_ITEM_GROUP_STATE = "invalidateGroup";
    const SAVED_ITEM_GROUP_EDITOR_STATE = "savedGroupEditor";
    const SAVED_ITEM_GROUP_STATE = "savedGroupItem";
    const LAST_SAVED_ITEM_GROUP_STATE = "lastSavedGroupItem";

    var self = this;
    var groupManager = {};

    self.questionItemReference = {};
    self.surveyItemsRegistry = surveyItemsRegistry;
    self.verifyEndItemGroup = verifyEndItemGroup;
    self.identifiesGroupItemStatus = identifiesGroupItemStatus;
    self.getValidItemsByTemplateID = getValidItemsByTemplateID;
    self.setUpQuestionGroup = setUpQuestionGroup;

    onInit();

    function onInit() {
      let survey = WorkspaceService.getSurvey();
      groupManager = survey.SurveyItemGroupManager;
    }

    function surveyItemsRegistry(ctrl, fun) {
      self.questionItemReference[ctrl.item.templateID] = {};
      self.questionItemReference[ctrl.item.templateID].stateControl = fun;
      self.questionItemReference[ctrl.item.templateID].item = ctrl.item;
      self.questionItemReference[ctrl.item.templateID].ctrl = ctrl;
    }

    function verifyEndItemGroup(id) {
      var surveyItemGroup = groupManager.getGroupByMember(id);
      if (surveyItemGroup) return surveyItemGroup.end === id;
    }

    function identifiesGroupItemStatus(id) {
      let surveyItemGroup = groupManager.getGroupByMember(id);
      self.questionItemReference[surveyItemGroup.start].ctrl.stateItemGroup = SAVED_ITEM_GROUP_EDITOR_STATE;
      self.questionItemReference[surveyItemGroup.end].ctrl.stateItemGroup = LAST_SAVED_ITEM_GROUP_STATE;
      surveyItemGroup.members.forEach(member => {
        if (member.position === "middle") self.questionItemReference[member.id].ctrl.stateItemGroup = SAVED_ITEM_GROUP_STATE }
      );
    }

    function getValidItemsByTemplateID(id) {
      let stateComponent = {};
      self.itemsValidCanditates = _getCandidates(id);
      if (self.itemsValidCanditates.length === 1) {
        stateComponent.status = INVALID_ITEM_GROUP_STATE;
        _setStateComponent(id, stateComponent);
      } else {
        self.itemsValidCanditates.forEach(function (id, index) {
          if (index < 1) stateComponent.status = EDITOR_GROUP_STATE;
          else stateComponent.status = VALID_ITEM_GROUP_STATE;
          _setStateComponent(id, stateComponent);
        });
      }
    }

    function setUpQuestionGroup(id) {
      var data = {
        url: 'app/editor/ui/survey-item-editor/survey-item-group/item-group-dialog/survey-item-group-dialog-template.html',
        ctrl: 'SurveyItemGroupDialogController',
        item: _selectedForSurveyGroup(id),
        buttons: [
          {message: "CANCELAR", class: "md-primary md-layoutTheme-theme", action: _cancelGroupEdit},
          {message: "Salvar", class: "md-primary md-raised md-layoutTheme-theme", action: _saveSurveyGroup}
        ]
      };
      DialogService.show(data);
    }

    function _saveSurveyGroup() {
      console.log(DialogService.data.ctrl)
      var items = angular.copy(DialogService.data.item);
      groupManager.createGroup(DialogService.data.item);
      identifiesGroupItemStatus(items[0]);
      AddSurveyItemGroupEventFactory.create().execute();
      $mdDialog.cancel();
    }

    function _selectedForSurveyGroup(id) {
      let groupSurveyItems = [];
      if (self.questionItemReference[id].ctrl.stateItemGroup == EDITOR_GROUP_STATE) {
        groupSurveyItems.push(self.questionItemReference[id].item.templateID);
        self.itemsValidCanditates.forEach(itemCandidate => {
          if (
            self.questionItemReference[itemCandidate].ctrl.stateItemGroup == VALID_ITEM_GROUP_STATE &&
            self.questionItemReference[itemCandidate].ctrl.itemCandidateCheckbox) {
            groupSurveyItems.push(self.questionItemReference[itemCandidate].item.templateID);
          } else if (self.questionItemReference[itemCandidate].ctrl.stateItemGroup == VALID_ITEM_GROUP_STATE &&
            !self.questionItemReference[itemCandidate].ctrl.itemCandidateCheckbox) {
            self.questionItemReference[itemCandidate].ctrl.stateItemGroup = CREATE_ITEM_GROUP_STATE;
          }
        });
      }
      return groupSurveyItems;
    }



    //tratar: zerando sem gravar na memoria (implementar método que mantem o que tem em memória)
    function _cancelGroupEdit() {
      // self.itemsValidCanditates.forEach(itemCandidate => {
      //   self.questionItemReference[itemCandidate].ctrl.stateItemGroup = CREATE_ITEM_GROUP_STATE;
      // });
      // self.itemsValidCanditates = [];
      $mdDialog.cancel();
    }

    function _setStateComponent(id, stateComponent) {
      self.questionItemReference[id].stateControl.call(stateComponent);
    }

    function _getCandidates(id) {
      return groupManager.getGroupCandidates(id);
    }

    return self;
  }
}());
