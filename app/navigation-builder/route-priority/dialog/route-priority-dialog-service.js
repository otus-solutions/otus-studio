(function () {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.navigationRoutePriority')
    .service('otusjs.studio.navigationBuilder.navigationRoutePriority.RoutePriorityDialogService', service);

  service.$inject = [
    '$mdDialog',
    '$timeout',
    'WorkspaceService'
  ];

  function service($mdDialog, $timeout, WorkspaceService) {
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

    function DialogController($mdDialog, $timeout, node) {
      var navigations = [];
      var navigationContext = {};
      var routes = [];
      var self = this;
      self.node = node;
      self.endNode = self.node.outNeighbors.length - 1;
      self.beginNode = 0;
      self.changed = false;
      self.lastModificationIndex = -1;

      /* Public interface */
      self.up = up;
      self.down = down;
      self.cancel = cancel;
      self.confirm = confirm;
      self.style = style;

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
        self.lastModificationIndex = index - 1;
        _goToCleanStyle();
      }

      function down(index) {
        _orderNavigationByPriority(index, index + 1);
        self.node.orderNavigationByPriorityInMap(index, index + 1);
        self.changed = true;
        self.lastModificationIndex = index + 1;
        _goToCleanStyle();
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

      function style(index) {
        if (self.lastModificationIndex == index) {
          return { "background-color": "#e5ebed" }
        }
      };

      function _goToCleanStyle() {
        $timeout(function () {
          self.lastModificationIndex = -1;
        }, 1000);
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
