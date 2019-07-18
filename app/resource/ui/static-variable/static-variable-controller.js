(function () {
  'use strict';

  angular
    .module('resource.ui')
    .controller('studioStaticVariableCtrl', Controller);

  Controller.$inject = [
    'resources.business.StaticVariableService'
  ];

  function Controller(StaticVariableService) {
    var self = this;
    self.disabled = true;
    self.variablesListEmpty = true;
    self.variable = {
      name: '',
      lastSending: true,
      sending: '',
      hasDescription: false,
      description: '',
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
    self.hasDescription = hasDescription;
    self.addCustom = addCustom;
    self.removeCustom = removeCustom;
    self.clearFields = clearFields;
    self.addVariable = addVariable;
    self.variablesList = variablesList;
    self.variablesListIsEmpty = variablesListIsEmpty;

    function onInit() {
      variablesList();
    }

    function isCurrentSending() {
      return self.variable.lastSending ? true : false;
    }

    function isCustomize() {
      return self.variable.customize ? true : false;
    }

    function hasDescription() {
      return self.variable.hasDescription ? true : false;
    }

    function addCustom() {
      var customization = angular.copy(self.customization);
      self.variable.customizations.push(customization);
      _clearCustomFields();
    }

    function removeCustom() {

    }

    function _clearCustomFields() {

    }

    function addVariable() {
      StaticVariableService.create().execute(self.variable);
    }

    function clearFields() {

    }

    function variablesList() {
      self.variablesList = [
        {
          name: 'ABC13',
          lastSending: true,
          sending: -1,
          customize: true,
          customizations: [{
            valeu: 1,
            label: 'Perdeu o bebê'
          }]
        },
        {
          name: 'CSJ11',
          lastSending: true,
          sending: -1,
          customize: true,
          customizations: [{
            valeu: 0,
            label: 'Não'
          },
          {
            valeu: 1,
            label: 'Sim'
          }]
        }
      ];
    }

    function variablesListIsEmpty() {
      return !self.variablesList.length > 0;
    }

  }
}());
