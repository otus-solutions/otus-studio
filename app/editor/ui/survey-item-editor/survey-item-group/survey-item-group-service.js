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
    self.surveyItemsRegistry = surveyItemsRegistry;
    self.verifyEndItemGroup = verifyEndItemGroup;
    self.identifiesGroupItemStatus = identifiesGroupItemStatus;
    self.preparesValidCandidatesForGroupEditing = preparesValidCandidatesForGroupEditing;
    self.setUpQuestionGroup = setUpQuestionGroup;
    self.monitoringCheckboxState = monitoringCheckboxState;
    self.editModeInUse = false;
    self.validCandidates = [];

    let remove; //todo: remove


    init();


    function init() {
      WorkspaceService.registerObserver({update: _clean});
      remove = $rootScope.$on('item.remove', respond);
      $rootScope.$on('item.move', respond);
    }

    function respond(event,item) {
      console.log(event,item);
      console.log(remove);
      // remove();  //remove o watcher em item.remove
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
      let itemGroup = _getGroup(id);
      return itemGroup ? itemGroup.end === id : false;
    }

    function _getGroup(id) {
      return _getSurveyItemGroupManager().getGroupByMember(id);
    }

    function identifiesGroupItemStatus(id) {
      let colorGroup = _getColorGroup(id);
      _getGroup(id).members.filter(item => {
        item.position === "start" ?
          _setItemGroupState(item.id, StateValues.SAVED_ITEM_GROUP_EDITOR_STATE, colorGroup) :
          _setItemGroupState(item.id, StateValues.SAVED_ITEM_GROUP_STATE, colorGroup)
      });
    }

    function _getColorGroup(id) {
      return _getGroup(id).instantColorGroup = getColorCode(id);
    }

    function getColorCode(id) {
      let members = JSON.stringify(_getGroup(id).members);
      let hash = Array.from(members)
        .reduce((s, c) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0);
      return `#${hashToARGB(hash)}`
    }

    function hashToARGB (hash) {
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
        _getGroup(id).members.forEach(function (item) {
          (item.position !== "start") ? _getRegisteredItem(item.id).ctrl.itemCandidateCheckbox = true : 0
        })
      }
      _enableGroupEditor(self.validCandidates);
    }

    function monitoringCheckboxState(ctrl) {
      let idx = self.validCandidates.indexOf(ctrl.item.templateID);
      ctrl.itemCandidateCheckbox ?
        unmarkCandidatesPerBlock(self.validCandidates, idx) :
        markCandidatesPerBlock(self.validCandidates, idx, )    }


    function markCandidatesPerBlock(validCandidates, idx) {
      validCandidates.slice(1, ++idx).reverse().forEach(item => {
        _getRegisteredItem(item).ctrl.itemCandidateCheckbox = true
      });
    }

    function unmarkCandidatesPerBlock(validCandidates, idx) {
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

    function setUpQuestionGroup(id) {
      let scaledItemGroup = _selectedForSurveyGroup(id);
      _groupCreationValidation(id, scaledItemGroup) ? _callGroupEditDialog(scaledItemGroup) : 0;
    }

    //fixme: pq há uma dialog sendo chamada dentro do método de validação?
    // pq em alguns lugares chama o serviço de dialog e em outros o $mdDialog?
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

    //fixme: AddSurveyItemGroupEventFactory é um método de add e está sendo chamado na exclusão de um grupo
    function _deleteGroup(items) {
      items.forEach(item => {
        _getRegisteredItem(item).ctrl.stateItemGroup = StateValues.CREATE_ITEM_GROUP_STATE;
        _getRegisteredItem(item).ctrl.itemCandidateCheckbox = false;
      });
      _getSurveyItemGroupManager().deleteGroup(items[0]);
      AddSurveyItemGroupEventFactory.create().execute();
      _setEditMode();
      $mdDialog.cancel();
    }

    //fixme: 'selected' significa selecionado. Geralmente desejamos que o nome de um método seja um verbo, dizendo a ação que ele executa.
    // se esse método seleciona, talvez o nome dele devesse ser 'selectForSurveyGroup'
    function _selectedForSurveyGroup(id) {
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

    //fixme: método cria um grupo e cancela uma dialog? Talvez o cancelamento da dialog devesse ser responsabilidade de quem a abriu
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
          _getRegisteredItem(item).ctrl.itemCandidateCheckbox = false;
          _getRegisteredItem(item).ctrl.stateItemGroup = StateValues.CREATE_ITEM_GROUP_STATE;
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
