(function () {
  'use strict';

  angular
    .module('editor.ui')
    .controller('SurveyItemGroupController', Ctrl);

  function Ctrl(data) {
    var vm = this;
    //console.log(WorkspaceService.getSurvey().getItems());
    console.log(data);

    vm.enabledQuestions = _questionValidator(WorkspaceService) || [];
    vm.enabledQuestions = _data.questions || [];
    console.log(vm.enabledQuestions);

    //vm.BUTTONS = data.buttons || [];
    //vm.cancel = data.cancel;
  }

  // function _questionValidator(WorkspaceService){
  //   console.log(WorkspaceService);
  //   let questions = angular.copy(WorkspaceService.getSurvey().getItems());
  //   let enableQuestions = [];
  //   questions.forEach( question => enableQuestions.push({'acronym':question.templateID, 'acronymCustom': question.customID}));
  //   return enableQuestions;
  // }
}());
