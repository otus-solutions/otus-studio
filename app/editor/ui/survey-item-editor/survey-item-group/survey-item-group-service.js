(function () {
  'use strict';
  angular
    .module('editor.ui')
    .service('SurveyItemGroupService', Service);

  Service.$inject = [
    '$rootScope',
    'WorkspaceService',
    'AddSurveyItemGroupEventFactory',
    '$mdDialog',
    'DialogService',
    'SurveyItemGroupValue'
  ];

  function Service($rootScope, WorkspaceService, AddSurveyItemGroupEventFactory, $mdDialog, DialogService, StateValues) {
    let self = this;

    self.questionItemReference = {};
    self.editModeInUse = false;
    self.validCandidates = [];

    self.surveyItemsRegistry = surveyItemsRegistry;
    self.verifyEndItemGroup = verifyEndItemGroup;
    self.identifiesGroupItemStatus = identifiesGroupItemStatus;
    self.preparesValidCandidatesForGroupEditing = preparesValidCandidatesForGroupEditing;
    self.setSurveyGroup = setSurveyGroup;
    self.monitoringCheckboxState = monitoringCheckboxState;
    self.getGroup = getGroup;

    init();

    function init() {
      WorkspaceService.registerObserver({update: _clean});
      $rootScope.$on('item.remove', _respondToItemRemoval);
      $rootScope.$on('item.move', _respondMove);
    }

    function _respondMove(event, item, group) {
      if (group) {
        uncheckMovedItem(item.templateID);

        recoveryStatesAfterRemoval(item.templateID, group);
      }

    }

    function _respondToItemRemoval(event, item, group) {
      if (group) {
        recoveryStatesAfterRemoval(item.templateID, group);
      }
    }

    function uncheckMovedItem(templateID) {
      self.questionItemReference[templateID].ctrl.stateItemGroup = StateValues.CREATE_ITEM_GROUP_STATE;
    }

    function recoveryStatesAfterRemoval(id, group) {
      if (group.members.length <= 2 && (group.start === id || group.end === id)) {
        if (group.start === id) {
          self.questionItemReference[group.end].ctrl.stateItemGroup = StateValues.CREATE_ITEM_GROUP_STATE;
          self.questionItemReference[group.end].ctrl.itemCandidateCheckbox = false;
        } else {
          self.questionItemReference[group.start].ctrl.stateItemGroup = StateValues.CREATE_ITEM_GROUP_STATE;
          self.questionItemReference[group.start].ctrl.itemCandidateCheckbox = false;
        }
      } else {
        setGroupIcons(group);
      }
    }

    function _clean() {
      self.questionItemReference = {};
      self.editModeInUse = false;
      self.validCandidates = [];
    }

    function surveyItemsRegistry(ctrl, fun) {
      self.questionItemReference[ctrl.item.templateID] = {};
      self.questionItemReference[ctrl.item.templateID].stateControl = fun;
      self.questionItemReference[ctrl.item.templateID].ctrl = ctrl;
    }

    function _getRegisteredItem(id) {
      return self.questionItemReference[id];
    }

    function _getSurveyItemGroupManager() {
      return WorkspaceService.getSurvey().SurveyItemGroupManager;
    }

    function verifyEndItemGroup(id) {
      let itemGroup = getGroup(id);
      return itemGroup ? itemGroup.end === id : false;
    }

    function getGroup(id) {
      return _getSurveyItemGroupManager().getGroupByMember(id);
    }

    function identifiesGroupItemStatus(id) {
      setGroupIcons(getGroup(id));
    }

    function setGroupIcons(group) {
      let colorGroup = _getColorGroup(group.start);

      group.members.forEach(member => {
        member.position === StateValues.START_POSITION ?
          _setItemGroupState(member.id, StateValues.SAVED_ITEM_GROUP_EDITOR_STATE, colorGroup) :
          _setItemGroupState(member.id, StateValues.SAVED_ITEM_GROUP_STATE, colorGroup);
      });
    }

    function _getColorGroup(id) {
      return getGroup(id).instantColorGroup = _getColorCode(id);
    }

    function _getColorCode(id) {
      let members = JSON.stringify(getGroup(id).members);
      let hash = Array.from(members)
        .reduce((s, c) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0);
      return `#${_hashToARGB(hash)}`
    }

    function _hashToARGB(hash) {
      let hex = ((hash >> 24) & 0xFF).toString(16) +
        ((hash >> 16) & 0xFF).toString(16) +
        ((hash >> 8) & 0xFF).toString(16) +
        (hash & 0xFF).toString(16);
      hex += '000000';
      return hex.substring(0, 6);
    }

    function _setItemGroupState(id, state, color) {
      _getRegisteredItem(id).ctrl.stateItemGroup = state;
      _getRegisteredItem(id).ctrl.stateColor = color;
    }

    function preparesValidCandidatesForGroupEditing(id) {
      if (self.editModeInUse) return;
      self.validCandidates = _getCandidates(id);

      if (_getRegisteredItem(id).ctrl.stateItemGroup === StateValues.SAVED_ITEM_GROUP_EDITOR_STATE) {
        getGroup(id).members.forEach(function (item) {
          (item.position !== StateValues.START_POSITION) ? _getRegisteredItem(item.id).ctrl.itemCandidateCheckbox = true : 0
        })
      }
      _enableGroupEditor(self.validCandidates);
    }

    function monitoringCheckboxState(ctrl) {
      let idx = self.validCandidates.indexOf(ctrl.item.templateID);
      ctrl.itemCandidateCheckbox ?
        _unmarkCandidatesPerBlock(self.validCandidates, idx) :
        _markCandidatesPerBlock(self.validCandidates, idx,)
    }

    function _markCandidatesPerBlock(validCandidates, idx) {
      validCandidates.slice(1, ++idx).reverse().forEach(item => {
        _getRegisteredItem(item).ctrl.itemCandidateCheckbox = true
      });
    }

    function _unmarkCandidatesPerBlock(validCandidates, idx) {
      validCandidates.slice(idx, validCandidates.length).forEach(item => {
        _getRegisteredItem(item).ctrl.itemCandidateCheckbox = false
      });
    }

    function _enableGroupEditor(validCandidates) {
      (validCandidates.length > 1) ?
        _setGroupEditorTools(validCandidates) :
        _setStateComponent(validCandidates[0], {status: StateValues.INVALID_ITEM_GROUP_STATE});
    }

    function _setGroupEditorTools(validCandidates) {
      validCandidates.forEach((id, index) => (index < 1) ?
        _setStateComponent(id, {status: StateValues.EDITOR_GROUP_STATE}) :
        _setStateComponent(id, {status: StateValues.VALID_ITEM_GROUP_STATE}));
      _setEditMode();
    }

    function _getCandidates(id) {
      return _getSurveyItemGroupManager().getGroupCandidates(id);
    }

    function _setStateComponent(id, stateComponent) {
      _getRegisteredItem(id).stateControl.call(stateComponent);
    }

    function setSurveyGroup(id) {
      let scaledItemGroup = _selectForSurveyGroup(id);
      _isValidGroupCreation(id, scaledItemGroup) ? _callGroupEditDialog(scaledItemGroup) : 0;
    }

    function _isValidGroupCreation(id, scaledItemGroup) {
      let validation = true;
      if (scaledItemGroup.length === 1) {
        _setEditMode();
        _callAlertForGroupCreationNotAllowed();
        self.questionItemReference[id].ctrl.stateItemGroup = StateValues.CREATE_ITEM_GROUP_STATE;
        getGroup(id) ? identifiesGroupItemStatus(scaledItemGroup[0]) : 0;
        validation = false;
      }
      return validation;
    }

    function _callAlertForGroupCreationNotAllowed() {
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title(StateValues.EDITOR_GROUP_VALIDATION_ALERT_TITLE)
          .textContent(StateValues.EDITOR_GROUP_VALIDATION_ALERT_TEXT_CONTENT)
          .ok('OK')
      );
    }

    function _callGroupEditDialog(scaledItemGroup) {
      let data = {
        url: 'app/editor/ui/survey-item-editor/survey-item-group/item-group-dialog/survey-item-group-dialog-template.html',
        ctrl: 'SurveyItemGroupDialogController',
        item: scaledItemGroup,
        cancelGroupEdit: _cancelGroupEdit,
        deleteGroup: _deleteGroup,
        buttons: [
          {
            message: StateValues.EDITOR_GROUP_CANCEL_BUTTON,
            class: "md-primary md-layoutTheme-theme",
            action: _cancelGroupEdit
          },
          {
            message: StateValues.EDITOR_GROUP_SAVE_BUTTON,
            class: "md-primary md-raised md-layoutTheme-theme",
            action: _saveSurveyGroup
          }
        ]
      };
      DialogService.show(data);
    }

    function _deleteGroup(items) {
      items.forEach(item => {
        _getRegisteredItem(item).ctrl.stateItemGroup = StateValues.CREATE_ITEM_GROUP_STATE;
        _getRegisteredItem(item).ctrl.itemCandidateCheckbox = false;
      });
      _getSurveyItemGroupManager().deleteGroup(items[0]);
      _updatedModelPersist();
      _setEditMode();
      _finishEditing();
    }

    function _selectForSurveyGroup(id) {
      let selectedCandidates = [];

      _getCandidates(id).forEach(candidate => {
        (_getRegisteredItem(candidate).ctrl.stateItemGroup === StateValues.EDITOR_GROUP_STATE) ?
          selectedCandidates.push(_getRegisteredItem(candidate).ctrl.item.templateID) : 0;

        (_getRegisteredItem(candidate).ctrl.itemCandidateCheckbox) ?
          selectedCandidates.push(_getRegisteredItem(candidate).ctrl.item.templateID) :
          _setItemGroupState(candidate, StateValues.CREATE_ITEM_GROUP_STATE);
      });
      return selectedCandidates;
    }

    function _saveSurveyGroup() {
      let items = angular.copy(DialogService.data.item);
      _getSurveyItemGroupManager().createGroup(DialogService.data.item);
      identifiesGroupItemStatus(items[0]);
      _updatedModelPersist();
      _setEditMode();
      _finishEditing();
    }

    function _updatedModelPersist() {
      AddSurveyItemGroupEventFactory.create().execute();
    }

    function _cancelGroupEdit() {
      DialogService.data.item.forEach(item => {
        let group = getGroup(item);
        if (group) identifiesGroupItemStatus(item);
        else {
          _getRegisteredItem(item).ctrl.itemCandidateCheckbox = false;
          _getRegisteredItem(item).ctrl.stateItemGroup = StateValues.CREATE_ITEM_GROUP_STATE;
        }
      });
      DialogService.data.item = [];
      _setEditMode();
      _finishEditing();
    }

    function _finishEditing() {
      $mdDialog.cancel();
    }

    function _setEditMode() {
      self.editModeInUse = !self.editModeInUse;
    }
  }
}());
