(function () {
  'use strict';

  angular
    .module('resource.ui')
    .run(['$anchorScroll', function ($anchorScroll) {
      $anchorScroll.yOffset = 50;
    }])
    .controller('studioStaticVariableCtrl', Controller);

  Controller.$inject = [
    '$scope',
    '$mdDialog',
    '$location',
    '$anchorScroll',
    'resources.business.StaticVariableService'
  ];

  function Controller($scope, $mdDialog, $location, $anchorScroll, StaticVariableService) {
    var MESSAGE_TO_REMOVE = 'Excluir variável';
    var MESSAGE_GENERIC = 'Você tem certeza que deseja realizar essa operação?';
    var _indexOfVariableInEdition = -1;
    var self = this;
    self.disabled = true;
    self.isEdition = false;
    self.variablesList = [];

    /* Public methods */
    self.$onInit = onInit;
    self.isCustomize = isCustomize;
    self.addCustom = addCustom;
    self.removeCustom = removeCustom;
    self.saveVariable = saveVariable;
    self.cancel = cancel;
    self.variablesListIsEmpty = variablesListIsEmpty;
    self.editVariable = editVariable;
    self.removeVariable = removeVariable;
    self.removeCustomFields = removeCustomFields;

    function onInit() {
      self.variable = StaticVariableService.createStructureToStaticVariable();
      console.log(self.variable);
      _getStaticVariableList();
    }

    function isCustomize() {
      return self.variable.customized;
    }

    function addCustom() {
      var customization = angular.copy(self.customization);
      self.variable.addCustomization(customization.value, customization.label);
      _clearCustomFields();
    }

    function removeCustom(index) {
      self.variable.customizations.splice(index, 1);
    }

    function saveVariable() {
      if (!self.isEdition)
        StaticVariableService.createVariable(angular.copy(self.variable));
      else {
        StaticVariableService.updateVariable(_indexOfVariableInEdition, angular.copy(self.variable));
        self.isEdition = false;
      }
      _clearAllFields();
      _getStaticVariableList();
    }

    function cancel() {
      _clearAllFields();
      self.isEdition = false;
    }

    function variablesListIsEmpty() {
      if (self.variablesList)
        return !self.variablesList.length > 0;
      return true;
    }

    function editVariable(index) {
      var toEdition = self.variablesList.find(function (variable, i) {
        if (i === index)
          return variable;
      });
      self.variable = angular.copy(toEdition);
      _indexOfVariableInEdition = index;
      self.isEdition = true;
      _scrollToTop();
    }

    function removeVariable(index, event) {
      $mdDialog.show({
        controller: _DialogController,
        templateUrl: 'app/resource/ui/generic-dialog/generic-dialog-template.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: $scope.customFullscreen,
        locals: {
          title: MESSAGE_TO_REMOVE,
          body: MESSAGE_GENERIC
        }
      }).then(function () {
        var toRemove = self.variablesList.find(function (variable, i) {
          if (i === index)
            return variable;
        });
        StaticVariableService.removeVariable(index, toRemove);
      }, function () { });
    }

    function removeCustomFields() {
      self.variable.customized = false;
      self.variable.customizations = [];
    }

    function _clearCustomFields() {
      self.customization.value = '';
      self.customization.label = '';
    }

    function _DialogController($scope, $mdDialog, title, body) {
      $scope.title = '';
      $scope.body = '';
      /* Lifecycle hooks */
      _onInit();

      function _onInit() {
        $scope.title = title;
        $scope.body = body;
      }

      /* Public methods */
      $scope.cancel = function () {
        $mdDialog.cancel();
      };

      $scope.answer = function () {
        $mdDialog.hide();
      };
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
    }

    function _clearAllFields() {
      self.variable = StaticVariableService.createStructureToStaticVariable();
    }

  }
}());
