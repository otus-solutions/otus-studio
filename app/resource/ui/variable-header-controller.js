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
    self.customize = false;
    self.variablesListEmpty = true;
    self.newVariable = {
      lastSending: true,
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
    self.isCustomize = isCustomize;

    function onInit() {
      isCurrentWave();
    }

    function isCurrentWave() {
      return self.newVariable.lastSending ? true : false;
    }

    function isCustomize() {
      return self.customize ? true : false
    }

  }
}());
