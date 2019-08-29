(function () {
  'use strict';

  angular
    .module('editor.ui')
    .controller('SurveyItemGroupDialogController', SurveyItemGroupDialogController);

  function SurveyItemGroupDialogController(data) {
    var vm = this;
    vm.item = data.item;
    vm.BUTTONS = data.buttons || [];
    vm.cancelGroupEdit = data.cancelGroupEdit;
    vm.deleteGroup = data.deleteGroup;
  }
}());
