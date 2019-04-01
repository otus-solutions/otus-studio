(function () {
  'use strict';

  angular
    .module('editor.ui')
    .controller('SurveyItemOrderChangeController', DialogController);

  function DialogController(data) {
    var vm = this;

    vm.selectedQuestionNeighbor = 0;
    vm.selectedCriteria = 1;
    vm.item =  data.item;
    vm.position = data.position;
    vm.TEXT = data.text;
    vm.questions =  angular.copy(data.questions) || [];

    vm.questions.forEach(function (question, index) {
      question.position = index;
    });
    vm.questions = vm.questions.filter(function (question) {
      return question.templateID != data.item.templateID;
    });

    _buildCriteria();

    vm.BUTTONS = data.buttons || [];
    vm.cancel = data.cancel;

    vm.isBeginQuestion = function () {
      vm.selectedQuestionNeighbor = vm.selectedCriteria > 0 ? vm.selectedQuestionNeighbor : -1;
    };
    
    function _buildCriteria() {
      if (vm.position == 1){
        vm.criterias = [
          {label:"Após a", value: 1}
        ];
      } else {
        vm.criterias = [
          {label:"Início", value: 0},
          {label:"Após a", value: 1}
        ];
      }

    }

  }
}());
