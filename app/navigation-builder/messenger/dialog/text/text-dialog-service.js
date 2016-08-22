(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .service('otusjs.studio.navigationBuilder.TextDialogService', service);

  service.$inject = [
    '$mdDialog'
  ];

  function service($mdDialog) {
    var self = this;
    var _dialogSettings = {};

    _init();

    /* Public methods */
    self.showDialog = showDialog;

    function _init() {
      _dialogSettings.templateUrl = 'app/navigation-builder/messenger/dialog/text/text-dialog-template.html';
      _dialogSettings.controller = DialogController;
      _dialogSettings.controllerAs = 'ctrl';
      _dialogSettings.escapeToClose = false;
      _dialogSettings.fullscreen = false;
      _dialogSettings.hasBackdrop = false;
    }

    function showDialog(message) {
      _dialogSettings.locals = {
        message: message
      };
      $mdDialog.show(_dialogSettings);
    }
  }

  function DialogController($mdDialog, message) {
    var self = this;

    self.message = message;

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
