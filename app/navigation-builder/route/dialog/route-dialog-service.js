(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .service('otusjs.studio.navigationBuilder.NavigationDataDialogService', service);

  service.$inject = [
    '$mdDialog'
  ];

  function service($mdDialog) {
    var self = this;
    var _dialogSettings = {};

    /* Public interface */
    self.showDialog = showDialog;

    _init();

    function _init() {
      _dialogSettings.templateUrl = 'app/navigation-builder/route/dialog/route-dialog-template.html';
      _dialogSettings.controller = DialogController;
      _dialogSettings.controllerAs = 'ctrl';
      _dialogSettings.escapeToClose = true;
      _dialogSettings.fullscreen = true;
      _dialogSettings.hasBackdrop = true;
    }

    function showDialog(originNode, destinationNode) {
      _dialogSettings.locals = {
        origin: originNode,
        destination: destinationNode
      };
      $mdDialog.show(_dialogSettings);
    }
  }

  function DialogController($mdDialog, origin, destination) {
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
})();
