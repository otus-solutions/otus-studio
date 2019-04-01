(function () {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.navigationRoutePriority')
    .service('otusjs.studio.navigationBuilder.navigationRoutePriority.RoutePriorityDialogService', service);

  service.$inject = [
    '$mdDialog'
  ];

  function service($mdDialog) {
    self = this;
    var _dialogSettings = {};
    
    /* Public interface */
    self.showDialog = showDialog;
    self.closeDialog = closeDialog;

    _init();

    function _init() {
      _setupDialogConfiguration();
    }

    function showDialog(node) {
      _dialogSettings.locals = {
        node: node
      };
      $mdDialog.show(_dialogSettings);
    }

    function closeDialog() {
      $mdDialog.hide();
    }

    function _setupDialogConfiguration() {
      _dialogSettings.templateUrl = 'app/navigation-builder/route-priority/dialog/route-priority-dialog-template.html';
      _dialogSettings.controller = DialogController;
      _dialogSettings.controllerAs = 'ctrl';
      _dialogSettings.escapeToClose = false;
      _dialogSettings.fullscreen = true;
      _dialogSettings.hasBackdrop = true;
    }

    function DialogController($mdDialog, node) {
      var self = this;
      self.node = node;

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
