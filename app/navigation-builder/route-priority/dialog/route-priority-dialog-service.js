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
      var navigations = [];
      var navigationContext = {};
      var routes = [];
      var self = this;
      self.node = node;
      self.endNode = self.node.outNeighbors.length - 1;
      self.beginNode = 0;
      self.changed = false;

      /* Public interface */
      self.up = up;
      self.down = down;
      self.cancel = cancel;
      self.confirm = confirm;

      _init();

      function _init() {
        navigations = WorkspaceService.getSurvey().NavigationManager.getNavigationList();
        navigationContext = navigations.find(function (navigation) {
          if (navigation.origin === node.id) {
            return navigation;
          }
        });
        angular.copy(navigationContext.listRoutes(), routes);
      }

      function up(index) {
        _orderNavigationByPriority(index, index - 1);
        self.node.orderNavigationByPriorityInMap(index, index - 1);
        self.changed = true;
        self.whiteframe = "md-whiteframe-3dp";
      }

      function down(index) {
        _orderNavigationByPriority(index, index + 1);
        self.node.orderNavigationByPriorityInMap(index, index + 1);
        self.changed = true;
      }

      function cancel(response) {
        $mdDialog.hide(response);
      }

      function confirm(response) {
        navigationContext.setRoutes(routes);
        WorkspaceService.saveWork();
        self.changed = false;
        $mdDialog.hide(response);
      }

      function _orderNavigationByPriority(oldPosition, newPosition) {
        var aux = routes[newPosition];
        routes[newPosition] = routes[oldPosition];
        routes[oldPosition] = aux;
        return routes;
      }

    }
  }
}());
