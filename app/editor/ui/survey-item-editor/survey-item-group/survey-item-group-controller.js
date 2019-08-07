(function () {
  'use strict';

  angular
    .module('editor.ui')
    .controller('SurveyItemGroupController', DialogController);

  function DialogController(data, WorkspaceService) {
    var vm = this;
    vm.selectedQuestion = 1;
    //console.log(WorkspaceService.getSurvey().getItems());
    console.log(data);

    vm.enabledQuestions = _questionValidator(WorkspaceService) || [];
    console.log(vm.enabledQuestions);

    vm.BUTTONS = data.buttons || [];
    vm.cancel = data.cancel;
  }

  function _questionValidator(WorkspaceService){
    console.log(WorkspaceService);
    let questions = angular.copy(WorkspaceService.getSurvey().getItems());
    let enableQuestions = [];
    questions.forEach( question => enableQuestions.push({'acronym':question.templateID, 'acronymCustom': question.customID}));
    return enableQuestions;
  }
}());
