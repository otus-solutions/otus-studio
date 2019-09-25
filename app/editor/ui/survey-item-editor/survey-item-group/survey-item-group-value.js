(function () {
  'use strict';

  angular.module('editor.ui')
    .value('SurveyItemGroupValue', {
      CREATE_ITEM_GROUP_STATE: "Criar Grupo",
      EDITOR_GROUP_STATE: "Definir Valores do Grupo",
      VALID_ITEM_GROUP_STATE: "Item Válido",
      INVALID_ITEM_GROUP_STATE: "Item Não Permitido",
      SAVED_ITEM_GROUP_EDITOR_STATE: "Editar Grupo",
      SAVED_ITEM_GROUP_STATE: "Item do Grupo",
      EDITOR_GROUP_VALIDATION_ALERT_TITLE: "Criação de Grupo Interrompida",
      EDITOR_GROUP_VALIDATION_ALERT_TEXT_CONTENT: "Selecione uma ou mais questões para criar um grupo",
      EDITOR_GROUP_CANCEL_BUTTON: "CANCELAR",
      EDITOR_GROUP_SAVE_BUTTON: "Salvar",
      START_POSITION: "start",
      STATE_COLOR: "#737373"
    })
})();
