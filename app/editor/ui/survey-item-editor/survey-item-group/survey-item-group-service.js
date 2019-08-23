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
  ];

  function Service(WorkspaceService, AddSurveyItemGroupEventFactory, $mdDialog, DialogService) {
    const CREATE_ITEM_GROUP_STATE = "createGroup";
    const EDITOR_GROUP_STATE = "editorGroup";
    const VALID_ITEM_GROUP_STATE = "validateGroup";
    const INVALID_ITEM_GROUP_STATE = "invalidateGroup";
    const SAVED_ITEM_GROUP_EDITOR_STATE = "savedGroupEditor";
    const SAVED_ITEM_GROUP_STATE = "savedGroupItem";
    const LAST_SAVED_ITEM_GROUP_STATE = "lastSavedGroupItem";

    let self = this;

    self.questionItemReference = {};
    self.surveyItemsRegistry = surveyItemsRegistry;
    self.verifyEndItemGroup = verifyEndItemGroup;
    self.identifiesGroupItemStatus = identifiesGroupItemStatus;
    self.getValidItemsByTemplateID = getValidItemsByTemplateID;
    self.setUpQuestionGroup = setUpQuestionGroup;
    self.editModeInUse = false;

    function surveyItemsRegistry(ctrl, fun) {
      self.questionItemReference[ctrl.item.templateID] = {};
      self.questionItemReference[ctrl.item.templateID].stateControl = fun;
      self.questionItemReference[ctrl.item.templateID].ctrl = ctrl;
    }

    function _getSurveyItemGroupManager() {
      return WorkspaceService.getSurvey().SurveyItemGroupManager;
    }

    function verifyEndItemGroup(id) {
      let itemGroup = _getGroup(id);
      return itemGroup ? itemGroup.end === id : 0
    }

    function _getGroup(id) {
      let group = _getSurveyItemGroupManager().getGroupByMember(id);
      return group ? group : 0;
    }

    function identifiesGroupItemStatus(id) {
      _getGroup(id).members.filter(item => {
        item.position === "middle" ? _setItemGroupState(item.id, SAVED_ITEM_GROUP_STATE) : 0;
        item.position === "start" ? _setItemGroupState(item.id, SAVED_ITEM_GROUP_EDITOR_STATE) : 0;
        item.position === "end" ? _setItemGroupState(item.id, LAST_SAVED_ITEM_GROUP_STATE) : 0;
      });
    }

    function _setItemGroupState(id, state) {
      self.questionItemReference[id].ctrl.stateItemGroup = state;
    }

    function getValidItemsByTemplateID(id) {
      if (self.editModeInUse) return 0;
      let validCandidates = _getCandidates(id);

      if (self.questionItemReference[id].ctrl.stateItemGroup === SAVED_ITEM_GROUP_EDITOR_STATE) {
        _getGroup(id).members.forEach(function (item) {
          (item.position !== "start") ? self.questionItemReference[item.id].ctrl.itemCandidateCheckbox = true : 0
        })
      }
      _createGroupEditor(validCandidates);
    }

    function _createGroupEditor(validCandidates) {
      (validCandidates.length > 1) ? setGroupEditorTools(validCandidates) : _setStateComponent(validCandidates[0], {status: INVALID_ITEM_GROUP_STATE});
    }

    function setGroupEditorTools(validCandidates) {
      validCandidates.forEach((id, index) => (index < 1) ? _setStateComponent(id, {status: EDITOR_GROUP_STATE}) : _setStateComponent(id, {status: VALID_ITEM_GROUP_STATE}));
      _setEditMode(true);
    }

    function _getCandidates(id) {
      return _getSurveyItemGroupManager().getGroupCandidates(id);
    }

    function _setStateComponent(id, stateComponent) {
      self.questionItemReference[id].stateControl.call(stateComponent);
    }

    function setUpQuestionGroup(id) {
      let scaledItemGroup = _selectedForSurveyGroup(id);
      _groupCreationValidation(id, scaledItemGroup) ? _callGroupEditDialog(scaledItemGroup) : 0;
    }

    function _groupCreationValidation(id, scaledItemGroup) {
      let validation = true;
      if (scaledItemGroup.length === 1) {
        _setEditMode(false);
        $mdDialog.show(
          $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Criação de Grupo negada')
            .textContent('Verificamos que somente a questão inicial está habilitada')
            .ok('OK')
        );
        self.questionItemReference[id].ctrl.stateItemGroup = CREATE_ITEM_GROUP_STATE;
        _getGroup(id) ? identifiesGroupItemStatus(scaledItemGroup[0]) : 0;
        validation = false;
      }
      return validation;
    }

    function _callGroupEditDialog(scaledItemGroup) {
      let data = {
        url: 'app/editor/ui/survey-item-editor/survey-item-group/item-group-dialog/survey-item-group-dialog-template.html',
        ctrl: 'SurveyItemGroupDialogController',
        item: scaledItemGroup,
        cancelGroupEdit: _cancelGroupEdit,
        deleteGroup: _deleteGroup,
        buttons: [
          {message: "CANCELAR", class: "md-primary md-layoutTheme-theme", action: _cancelGroupEdit},
          {message: "Salvar", class: "md-primary md-raised md-layoutTheme-theme", action: _saveSurveyGroup}
        ]
      };
      DialogService.show(data);
    }

    function _deleteGroup(items) {
      items.forEach(item => {
        self.questionItemReference[item].ctrl.stateItemGroup = CREATE_ITEM_GROUP_STATE;
        self.questionItemReference[item].ctrl.itemCandidateCheckbox = false;
      });
      _getSurveyItemGroupManager().deleteGroup(items[0]);
      AddSurveyItemGroupEventFactory.create().execute();
      _setEditMode(false);
      $mdDialog.cancel();
    }

    function _selectedForSurveyGroup(id) {
      let selectedCandidates = [];
      _getCandidates(id).forEach(candidate => {
        (self.questionItemReference[candidate].ctrl.stateItemGroup === EDITOR_GROUP_STATE) ? selectedCandidates.push(self.questionItemReference[candidate].ctrl.item.templateID) : 0;
        (self.questionItemReference[candidate].ctrl.itemCandidateCheckbox) ? selectedCandidates.push(self.questionItemReference[candidate].ctrl.item.templateID) : _setItemGroupState(candidate, CREATE_ITEM_GROUP_STATE);
      });
      return selectedCandidates;
    }

    function _saveSurveyGroup() {
      let items = angular.copy(DialogService.data.item);
      _getSurveyItemGroupManager().createGroup(DialogService.data.item);
      identifiesGroupItemStatus(items[0]);
      AddSurveyItemGroupEventFactory.create().execute();
      _setEditMode(false);
      $mdDialog.cancel();
    }

    function _cancelGroupEdit() {
      DialogService.data.item.forEach(item => {
        let group = _getGroup(item);
        if (group) identifiesGroupItemStatus(item);
        else {
          self.questionItemReference[item].ctrl.itemCandidateCheckbox = false;
          self.questionItemReference[item].ctrl.stateItemGroup = CREATE_ITEM_GROUP_STATE;
        }
      });
      DialogService.data.item = [];
      _setEditMode(false);
      $mdDialog.cancel();
    }

    function _setEditMode(state) {
      self.editModeInUse = state;
    }

    return self;
  }
}());
