(function () {
  'use strict';
  angular
    .module('editor.ui')
    .service('SurveyItemGroupService', Service);

  Service.$inject = [
    'WorkspaceService',
    'AddSurveyItemGroupEventFactory',
    '$mdDialog',
    'DialogService',
    'SurveyItemGroupValue'
  ];

  function Service(WorkspaceService, AddSurveyItemGroupEventFactory, $mdDialog, DialogService, StateValues) {
    let self = this;

    self.questionItemReference = {};
    self.surveyItemsRegistry = surveyItemsRegistry;
    self.verifyEndItemGroup = verifyEndItemGroup;
    self.identifiesGroupItemStatus = identifiesGroupItemStatus;
    self.getValidItemsByTemplateID = getValidItemsByTemplateID;
    self.setUpQuestionGroup = setUpQuestionGroup;
    self.monitoringCheckboxState = monitoringCheckboxState;
    self.editModeInUse = false;
    self.validCandidates = [];


    init();
    function init() {
      WorkspaceService.registerObserver({update:_clean});
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

    function _getItemRegistered(id) {
      return self.questionItemReference[id];
    }

    function _getSurveyItemGroupManager() {
      return WorkspaceService.getSurvey().SurveyItemGroupManager;
    }

    function verifyEndItemGroup(id) {
      let itemGroup = _getGroup(id);
      return itemGroup ? itemGroup.end === id : 0;
    }

    function _getGroup(id) {
      return _getSurveyItemGroupManager().getGroupByMember(id);
    }

    function identifiesGroupItemStatus(id) {
       let instantColorGroup = changeColorGroupItems(id)
      _getGroup(id).members.filter(item => {
        item.position === "start" ?
          _setItemGroupState(item.id, StateValues.SAVED_ITEM_GROUP_EDITOR_STATE,  instantColorGroup) :
          _setItemGroupState(item.id, StateValues.SAVED_ITEM_GROUP_STATE, instantColorGroup)
      });
    }

    function changeColorGroupItems(id) {
      return _getGroup(id).instantColorGroup = getRandomColor();

    }

    function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    function _setItemGroupState(id, state, color) {
      _getItemRegistered(id).ctrl.stateItemGroup = state;
      _getItemRegistered(id).ctrl.stateColor = color;
    }

    function getValidItemsByTemplateID(id) {
      if (self.editModeInUse) return 0;
      self.validCandidates = _getCandidates(id);

      if (_getItemRegistered(id).ctrl.stateItemGroup === StateValues.SAVED_ITEM_GROUP_EDITOR_STATE) {
        _getGroup(id).members.forEach(function (item) {
          (item.position !== "start") ? _getItemRegistered(item.id).ctrl.itemCandidateCheckbox = true : 0
        })
      }
      _createGroupEditor(self.validCandidates);
    }

    function monitoringCheckboxState(ctrl) {
      let idx = self.validCandidates.indexOf(ctrl.item.templateID);
      ctrl.itemCandidateCheckbox ?
        unmarkCandidatesPerBlock(self.validCandidates, idx, false) :
        markCandidatesPerBlock(self.validCandidates, idx, true)
    }

    function markCandidatesPerBlock(validCandidates, idx, state) {
      validCandidates.slice(1, ++idx).reverse().forEach(item => {
        _getItemRegistered(item).ctrl.itemCandidateCheckbox = state
      });
    }

    function unmarkCandidatesPerBlock(validCandidates, idx, state) {
      validCandidates.slice(idx, validCandidates.length).forEach(item => {
        _getItemRegistered(item).ctrl.itemCandidateCheckbox = state
      });
    }

    function _createGroupEditor(validCandidates) {
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
      _getItemRegistered(id).stateControl.call(stateComponent);
    }

    function setUpQuestionGroup(id) {
      let scaledItemGroup = _selectedForSurveyGroup(id);
      _groupCreationValidation(id, scaledItemGroup) ? _callGroupEditDialog(scaledItemGroup) : 0;
    }

    function _groupCreationValidation(id, scaledItemGroup) {
      let validation = true;
      if (scaledItemGroup.length === 1) {
        _setEditMode();
        $mdDialog.show(
          $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Criação de Grupo Interrompida')
            .textContent('Selecione uma ou mais questões para criar um grupo')
            .ok('OK')
        );
        self.questionItemReference[id].ctrl.stateItemGroup = StateValues.CREATE_ITEM_GROUP_STATE;
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
        _getItemRegistered(item).ctrl.stateItemGroup = StateValues.CREATE_ITEM_GROUP_STATE;
        _getItemRegistered(item).ctrl.itemCandidateCheckbox = false;
      });
      _getSurveyItemGroupManager().deleteGroup(items[0]);
      AddSurveyItemGroupEventFactory.create().execute();
      _setEditMode();
      $mdDialog.cancel();
    }

    function _selectedForSurveyGroup(id) {
      let selectedCandidates = [];

      _getCandidates(id).forEach(candidate => {
        (_getItemRegistered(candidate).ctrl.stateItemGroup === StateValues.EDITOR_GROUP_STATE) ?
          selectedCandidates.push(_getItemRegistered(candidate).ctrl.item.templateID) : 0;

        (_getItemRegistered(candidate).ctrl.itemCandidateCheckbox) ?
          selectedCandidates.push(_getItemRegistered(candidate).ctrl.item.templateID) :
          _setItemGroupState(candidate, StateValues.CREATE_ITEM_GROUP_STATE);
      });
      return selectedCandidates;
    }

    function _saveSurveyGroup() {
      let items = angular.copy(DialogService.data.item);
      _getSurveyItemGroupManager().createGroup(DialogService.data.item);
      identifiesGroupItemStatus(items[0]);
      AddSurveyItemGroupEventFactory.create().execute();
      _setEditMode();
      $mdDialog.cancel();
    }

    function _cancelGroupEdit() {
      DialogService.data.item.forEach(item => {
        let group = _getGroup(item);
        if (group) identifiesGroupItemStatus(item);
        else {
          _getItemRegistered(item).ctrl.itemCandidateCheckbox = false;
          _getItemRegistered(item).ctrl.stateItemGroup = StateValues.CREATE_ITEM_GROUP_STATE;
        }
      });
      DialogService.data.item = [];
      _setEditMode();
      $mdDialog.cancel();
    }

    function _setEditMode() {
      self.editModeInUse = !self.editModeInUse;
    }

    return self;
  }
}());
