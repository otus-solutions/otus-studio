(function () {
  'use strict';

  angular
    .module('editor.ui')
    .controller('SurveyItemOrderChangeController', DialogController);

  // DialogController.$inject = ['$window']
  function DialogController(data) {
    var vm = this;
    vm.questions = angular.copy(data.questions);
    vm.questions = vm.questions.filter(function (question) {
      return question.templateID != data.item.templateID;
    });
    vm.item =  data.item;
    vm.TEXT = data.text;
    vm.ariaLabel = data.ariaLabel;
    vm.criterias = [
      {label:"Início", value: 0},
      {label:"Após a", value: 1}
    ]
    vm.BUTTONS = data.buttons;
    vm.cancel = data.cancel;






  }
}());
