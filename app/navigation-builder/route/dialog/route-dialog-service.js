(function () {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.routeBuilder')
    .service('otusjs.studio.navigationBuilder.routeBuilder.RouteDialogService', service);

  service.$inject = [
    '$mdDialog',
    '$mdToast',
    'otusjs.studio.navigationBuilder.NavigationBuilderScopeService'
  ];

  function service($mdDialog, $mdToast, moduleScope) {
    var self = this;
    var _dialogSettings = {};

    /* Public interface */
    self.showDialog = showDialog;
    self.closeDialog = closeDialog;
    self.showWarningForGroups = showWarningForGroups;

    _init();

    function _init() {
      _setupDialogConfiguration();
    }

    function showDialog(originNode, destinationNode) {
      _dialogSettings.locals = {
        origin: originNode,
        destination: destinationNode,
        moduleScope: moduleScope
      };
      $mdDialog.show(_dialogSettings);
    }

    function closeDialog() {
      $mdDialog.hide();
    }

    function showWarningForGroups() {
      $mdToast.show(
        $mdToast.simple()
          .textContent('Só é possível criar pulos para a questão do início de um grupo ou então da questão final do grupo para outras questões')
          .position("bottom left")
          .hideDelay(4000)
      );
    }

    function _setupDialogConfiguration() {
      _dialogSettings.templateUrl = 'app/navigation-builder/route/dialog/route-dialog-template.html';
      _dialogSettings.controller = _DialogController;
      _dialogSettings.controllerAs = 'ctrl';
      _dialogSettings.escapeToClose = false;
      _dialogSettings.fullscreen = true;
      _dialogSettings.hasBackdrop = true;
    }

    function _DialogController($mdDialog, origin, destination, moduleScope) {
      var self = this;
      self.origin = origin;
      self.destination = destination;

      /* Public interface */
      self.cancel = cancel;
      self.confirm = confirm;

      function cancel(response) {
        $mdDialog.hide(response);
      }

      function confirm(response) {
        $mdDialog.hide(response);
      }
    }

  }
})();
