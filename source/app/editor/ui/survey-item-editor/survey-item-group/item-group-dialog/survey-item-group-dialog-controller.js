(function () {
  'use strict';

  angular
    .module('editor.ui')
    .controller('SurveyItemGroupDialogController', Controller);

  function Controller(data) {
    var vm = this;
    vm.item = data.item;
    vm.buttons = data.buttons || [];
    vm.cancelGroupEdit = data.cancelGroupEdit;
    vm.deleteGroup = data.deleteGroup;
    vm.deleteGroupButton = "DELETAR GRUPO"
  }
}());
