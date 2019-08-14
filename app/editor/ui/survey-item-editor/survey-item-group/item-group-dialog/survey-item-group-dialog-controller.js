(function () {
  'use strict';

  angular
    .module('editor.ui')
    .controller('SurveyItemGroupDialogController', groupDialogCtrl);

  function groupDialogCtrl(data) {
    var vm = this;
    vm.item = data.item;
    vm.BUTTONS = data.buttons || [];
    vm.cancel = data.cancel;
    //vm.questions = data.questions;
  }
}());
