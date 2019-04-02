(function () {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.navigationRoutePriority')
    .service('otusjs.studio.navigationBuilder.navigationRoutePriority.RoutePriorityDialogService', service);

  service.$inject = [
    '$mdDialog',
    'WorkspaceService'
  ];

  function service($mdDialog, WorkspaceService) {
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
      self.ready = true;
      self.node = node;
      self.endNode = self.node.outNeighbors.length - 1;
      self.beginNode = 0;
      self.changed = false;
      self.navigations = WorkspaceService.getSurvey().NavigationManager.getNavigationList();

      console.log(self.node.outNeighbors);
      console.log(self.navigations)

      /* Public interface */
      self.up = up;
      self.down = down;
      self.cancel = cancel;
      self.confirm = confirm;

      function up(index) {
        self.navigations.filter(function (navigation) {
          if (navigation.origin === node.id) {
            self.node.orderNavigationByPriorityInMap(index, index - 1);
          }
        });
        self.changed = true;
      }

      function down(index) {
        self.navigations.filter(function (navigation) {
          if (navigation.origin === node.id) {
            self.node.orderNavigationByPriorityInMap(index, index + 1);
          }
        });
        self.changed = true;
      }

      function cancel(response) {
        $mdDialog.hide(response);
      }

      function confirm(response) {
        self.navigations.filter(function (navigation) {
          if (navigation.origin === node.id) {
            navigation.setRoutes(self.node.outNeighbors);
            console.log(self.node.outNeighbors);
            console.log(navigation.listRoutes())
          }
        });
        self.changed = false;
        $mdDialog.hide(response);
      }

    }
  }
}());
