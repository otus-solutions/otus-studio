(function () {
  'use strict';

  angular.module('editor.ui')
    .value('SurveyItemGroupValue', {
      CREATE_ITEM_GROUP_STATE: "Criador de Grupo",
      EDITOR_GROUP_STATE: "Persistência de Grupo",
      VALID_ITEM_GROUP_STATE: "Item Válido",
      INVALID_ITEM_GROUP_STATE: "Item Não Permitido",
      SAVED_ITEM_GROUP_EDITOR_STATE: "Editor do Grupo",
      SAVED_ITEM_GROUP_STATE: "Item em Grupo",
      LAST_SAVED_ITEM_GROUP_STATE: "Fim do Grupo",
    })
})();
