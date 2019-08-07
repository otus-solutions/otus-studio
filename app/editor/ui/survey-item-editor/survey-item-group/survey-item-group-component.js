(function () {
  'use strict';

  angular.module('editor.ui')
    .component('surveyItemGroupComponent',{
      templateUrl: 'app/editor/ui/survey-item-editor/survey-item-group/survey-item-group-template.html',
      controller: 'otusSurveyItemGroupCtrl as $ctrl',
      bindings:{}
    }).controller('otusSurveyItemGroupCtrl', Ctrl);

  Ctrl.$inject = [];

  function Ctrl(data) {
    var self = this;
    console.log(data);

    vm.enabledQuestions = _questionValidator(WorkspaceService) || [];
    vm.enabledQuestions = _data.questions || [];
    console.log(vm.enabledQuestions);
  }
}());
