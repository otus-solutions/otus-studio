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
    self.variablesList = [];
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
    self.clearCustomFields = clearCustomFields;
    self.clearSendingFields = clearSendingFields;
    self.createVariable = createVariable;
    self.cancel = cancel;
    self.variablesListIsEmpty = variablesListIsEmpty;

    function onInit() {
      StaticVariableService.createStructureToStaticVariable();
      _getStaticVariableList();
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
      clearCustomFields();
    }

    function removeCustom(index) {
      self.variable.customizations.splice(index, 1);
    }

    function clearCustomFields() {
      self.customization.value = '';
      self.customization.label = '';
    }

    function createVariable() {
      StaticVariableService.createVariable(self.variable);
      _getStaticVariableList();
    }

    function cancel() {
      // TODO:
    }

    function clearSendingFields() {
      self.variable.sending = '';
    }

    function variablesListIsEmpty() {
      if (self.variablesList)
        return !self.variablesList.length > 0;
      return false;
    }

    function _getStaticVariableList() {
      self.variablesList = StaticVariableService.getStaticVariableList();
      _buildPresentationToCustomization();
    }

    function _buildPresentationToCustomization() {
      self.variablesList.forEach(variable => {
        if (variable.customizations) {
          variable.customizationPresentation = '';
          variable.customizations.forEach(customization => {
            if (!variable.customizationPresentation) {
              var result = variable.customizationPresentation.concat(customization.value + ' para: ' + customization.label);
              variable.customizationPresentation = result;
            } else {
              var result = variable.customizationPresentation.concat('; ' + customization.value + ' para: ' + customization.label);
              variable.customizationPresentation = result;
            }
          });
        }
      });
    }
  }
}());
