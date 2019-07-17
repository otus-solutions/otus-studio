(function () {
  'use strict';

  angular
    .module('resource.ui')
    .controller('studioVariableHeaderCtrl', Controller);

  Controller.$inject = ['WorkspaceService'];

  function Controller(WorkspaceService) {
    var self = this;
    self.disabled = true;
    self.variablesListEmpty = true;
    self.variable = {
      name: '',
      lastSending: true,
      sending: '',
      customize: false,
      customizations: []
    };
    self.customization = {
      value: '',
      label: ''
    }

    /* Public methods */
    self.$onInit = onInit;
    self.isCurrentSending = isCurrentSending;
    self.isCustomize = isCustomize;
    self.cancelCustom = cancelCustom;
    self.addCustom = addCustom;
    self.variablesList = variablesList;
    self.variablesListIsEmpty = variablesListIsEmpty;

    function onInit() {
      isCurrentSending();
      console.log(WorkspaceService.getSurvey());
    }

    function isCurrentSending() {
      return self.variable.lastSending ? true : false;
    }

    function isCustomize() {
      return self.variable.customize ? true : false
    }

    function cancelCustom() {

    }

    function addCustom() {
      var customization = angular.copy(self.customization);
      self.variable.customizations.push(customization);
    }

    function variablesList() {
    
    }

    function variablesListIsEmpty() {

    }

  }
}());
