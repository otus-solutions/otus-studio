(function () {
  'use strict';

  angular.module('editor.ui')
    .value('SurveyItemGroupValue', {
      CREATE_ITEM_GROUP_STATE: "createGroup",
      EDITOR_GROUP_STATE: "editorGroup",
      VALID_ITEM_GROUP_STATE: "validateGroup",
      INVALID_ITEM_GROUP_STATE: "invalidateGroup",
      SAVED_ITEM_GROUP_EDITOR_STATE: "savedGroupEditor",
      SAVED_ITEM_GROUP_STATE: "savedGroupItem",
      LAST_SAVED_ITEM_GROUP_STATE: "lastSavedGroupItem",
    })
})();
