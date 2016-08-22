(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.routeBuilder')
    .service('otusjs.studio.navigationBuilder.routeBuilder.RouteDialogService', service);

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
      _setupDialogConfiguration();
    }

    function _setupDialogConfiguration() {
      _dialogSettings.templateUrl = 'app/navigation-builder/route/dialog/route-dialog-template.html';
      _dialogSettings.controller = DialogController;
      _dialogSettings.controllerAs = 'ctrl';
      _dialogSettings.escapeToClose = false;
      _dialogSettings.fullscreen = true;
      _dialogSettings.hasBackdrop = true;
    }

    function showDialog(originNode, destinationNode, eventScope) {
      _dialogSettings.locals = {
        origin: originNode,
        destination: destinationNode,
        eventScope: eventScope
      };
      $mdDialog.show(_dialogSettings);
    }
  }

  function DialogController($mdDialog, origin, destination, eventScope) {
    var self = this;

    self.origin = origin;
    self.destination = destination;

    /* Public interface */
    self.cancel = cancel;
    self.confirm = confirm;

    function cancel(response) {
      $mdDialog.hide(response);
      eventScope.$broadcast(eventScope.events.ROUTE_BUILD_CANCELED);
    }

    function confirm(response) {
      // eventScope.$broadcast(eventScope.events.ROUTE_BUILD_CANCELED);
      $mdDialog.hide(response);
    }
  }
})();
