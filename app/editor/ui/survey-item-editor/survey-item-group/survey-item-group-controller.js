(function () {
  'use strict';

  angular
    .module('editor.ui')
    .controller('SurveyItemGroupController', DialogController);

  function DialogController(data, WorkspaceService) {
    var vm = this;
    //console.log(WorkspaceService.getSurvey().getItems());
    console.log(data);

    vm.enabledQuestions = _questionValidator(WorkspaceService) || [];
    console.log(vm.enabledQuestions);

    // vm.selectedQuestionNeighbor = 0;
    // vm.selectedCriteria = 1;
    // vm.item =  data.item;
    // vm.position = data.position;
    // vm.TEXT = data.text;
    // vm.questions =  angular.copy(data.questions) || [];
    //
    // vm.questions.forEach(function (question, index) {
    //   question.position = index;
    // });
    // vm.questions = vm.questions.filter(function (question) {
    //   return question.templateID != data.item.templateID;
    // });
    //
    // _buildCriteria();
    //
    // vm.BUTTONS = data.buttons || [];
    // vm.cancel = data.cancel;
    //
    // vm.isBeginQuestion = function () {
    //   vm.selectedQuestionNeighbor = vm.selectedCriteria > 0 ? vm.selectedQuestionNeighbor : -1;
    // };
    //
    // function _buildCriteria() {
    //   if (vm.position == 1){
    //     vm.criterias = [
    //       {label:"Após a", value: 1}
    //     ];
    //   } else {
    //     vm.criterias = [
    //       {label:"Início", value: 0},
    //       {label:"Após a", value: 1}
    //     ];
    //   }

    //}
  }

  function _questionValidator(WorkspaceService){
    console.log(WorkspaceService);
    let questions = angular.copy(WorkspaceService.getSurvey().getItems());
    let enableQuestions = [];
    questions.forEach( question => enableQuestions.push({'acronym':question.templateID, 'acronymCustom': question.customID}));
    return enableQuestions;
  }
}());
