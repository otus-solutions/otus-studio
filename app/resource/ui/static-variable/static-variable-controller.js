(function () {
  'use strict';

  angular
    .module('resource.ui')
    .run(['$anchorScroll', function ($anchorScroll) {
      $anchorScroll.yOffset = 50;
    }])
    .controller('studioStaticVariableCtrl', Controller);

  Controller.$inject = [
    '$location',
    '$anchorScroll',
    'resources.business.StaticVariableService'
  ];

  function Controller($location, $anchorScroll, StaticVariableService) {
    var self = this;
    self.disabled = true;
    self.isEdition = false;
    self.variablesList = [];
    self.variable = {
      name: '',
      description: '',
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
    self.isCustomize = isCustomize;
    self.addCustom = addCustom;
    self.removeCustom = removeCustom;
    self.clearCustomFields = clearCustomFields;
    self.clearSendingFields = clearSendingFields;
    self.createVariable = createVariable;
    self.cancel = cancel;
    self.variablesListIsEmpty = variablesListIsEmpty;
    self.removeVariable = removeVariable;
    self.editVariable = editVariable;

    function onInit() {
      StaticVariableService.createStructureToStaticVariable();
      _getStaticVariableList();
    }

    function isCustomize() {
      return self.variable.customize ? true : false;
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

    function createVariable(index) {
      if (!self.isEdition)
        StaticVariableService.createVariable(angular.copy(self.variable));
      else
        StaticVariableService.updateVariable(index, angular.copy(self.variable));
      _clearAllFields();
      _getStaticVariableList();
    }

    function cancel() {
      _clearAllFields();
      self.isEdition = false;
    }

    function _clearCustomFieldsList() {
      self.variable.customize = false;
      self.variable.customizations = [];
    }

    function _clearBasicVariableFields() {
      self.variable.name = '';
      self.variable.description = '';
    }

    function clearSendingFields() {
      self.variable.sending = '';
    }

    function variablesListIsEmpty() {
      if (self.variablesList)
        return !self.variablesList.length > 0;
      return true;
    }

    function removeVariable(index) {
      StaticVariableService.removeVariable(index);
    }

    function editVariable(index) {
      var toEdition = self.variablesList.find(function (variable, i) {
        if (i === index)
          return variable;
      });
      _buildPresentationToEdition(toEdition);
      self.isEdition = true;
      _scrollToTop();
    }

    function _scrollToTop() {
      var newHash = 'inputFields';
      if ($location.hash() !== newHash) {
        $location.hash('inputFields');
      } else {
        $anchorScroll();
      }
    };

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

    function _buildPresentationToEdition(variable) {
      self.variable.name = variable.name;
      self.variable.description = variable.description;
      self.variable.sending = variable.sending;
      self.variable.customize = variable.customize;
      self.variable.customizations = variable.customizations;
    }

    function _clearAllFields() {
      _clearBasicVariableFields();
      clearSendingFields();
      clearCustomFields();
      _clearCustomFieldsList();
    }
  }
}());
