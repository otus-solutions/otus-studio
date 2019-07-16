(function () {
  'use strict';

  angular
    .module('resource.ui')
    .controller('studioVariableHeaderCtrl', Controller);

  Controller.$inject = [
    'SelectedSurveyTemplatesManagementService'
  ];

  function Controller(SelectedSurveyTemplatesManagementService) {
    var self = this;
    self.disabled = true;
    self.newVariable = {
      currentWave: true,
      wave: -1,
      allQuestions: true,
      questions: [],
      identity: '',
      variable: '',
      label: ''
    };
    self.variables = [1, 2];

    /* Public methods */
    self.$onInit = onInit;
    self.isCurrentWave = isCurrentWave;
    self.isAllQuestions = isAllQuestions;

    function onInit() {
      isCurrentWave();
      isAllQuestions();
    }

    function isCurrentWave() {
      return self.newVariable.currentWave ? true : false
    }

    function isAllQuestions() {
      return self.newVariable.allQuestions ? true : false
    }

  }
}());
