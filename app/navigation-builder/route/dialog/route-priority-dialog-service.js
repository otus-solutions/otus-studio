(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.routeBuilder')
    .service('otusjs.studio.navigationBuilder.routeBuilder.RoutePriorityDialogService', service);

  service.$inject = [
    '$mdDialog'
  ];

  function service($mdDialog) {
    self = this;
    /* Public interface */
    self.showDialog = showDialog;
    self.closeDialog = closeDialog;

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

    function _setupDialogConfiguration() {
      _dialogSettings.templateUrl = 'app/navigation-builder/route/dialog/route-dialog-template.html';
      _dialogSettings.controller = DialogController;
      _dialogSettings.controllerAs = 'ctrl';
      _dialogSettings.escapeToClose = false;
      _dialogSettings.fullscreen = true;
      _dialogSettings.hasBackdrop = true;
    }

    function DialogController($mdDialog){

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
}());
