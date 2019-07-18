(function () {
  'use strict';

  angular
    .module('resource.ui')
    .controller('studioStaticVariableCtrl', Controller);

  Controller.$inject = [
    'resources.core.AddStaticVariableEventFactory'
  ];

  function Controller(AddStaticVariableEventFactory) {
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
    self.cancelCustom = cancelCustom;
    self.hasDescription = hasDescription;
    self.addCustom = addCustom;
    self.variablesList = variablesList;
    self.variablesListIsEmpty = variablesListIsEmpty;

    function onInit() {
    }

    function isCurrentSending() {
      return self.variable.lastSending ? true : false;
    }

    function isCustomize() {
      return self.variable.customize ? true : false
    }

    function cancelCustom() {
      console.log('opa');
    }

    function hasDescription() {
      return self.variable.hasDescription ? true : false
    }

    function addCustom() {
      var customization = angular.copy(self.customization);
      self.variable.customizations.push(customization);
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
