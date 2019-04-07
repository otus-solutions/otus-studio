(function () {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.navigationRoutePriority')
    .controller('dialogController', DialogController);

  DialogController.$inject = [
    'locals',
    '$mdDialog',
    '$timeout',
    'WorkspaceService'
  ];

  function DialogController(node,$mdDialog,$timeout,WorkspaceService) {
    var navigations = [];
    var navigationContext = {};
    var routes = [];
    var vm = this;

    vm.node = node.node;
    vm.selectedFirstNode = vm.node.outNeighbors[0];
    vm.endNode = vm.node.outNeighbors.length - 1;
    vm.beginNode = 0;
    vm.changed = false;
    vm.lastModificationIndex = -1;

    /* Public interface */
    vm.up = up;
    vm.down = down;
    vm.cancel = cancel;
    vm.confirm = confirm;
    vm.modificationClass = modificationClass;

    _init();

    function _init() {
      navigations = WorkspaceService.getSurvey().NavigationManager.getNavigationList();
      navigationContext = navigations.find(function (navigation) {
        if (navigation.origin === node.node.id) {
          return navigation;
        }
      });

      angular.copy(navigationContext.listRoutes(), routes);
    }

    function up(index) {
      _orderNavigationByPriority(index, index - 1);
      vm.node.orderNavigationByPriorityInMap(index, index - 1);
      vm.changed = true;
      vm.lastModificationIndex = index - 1;
      _goToCleanStyle();
    }

    function down(index) {
      _orderNavigationByPriority(index, index + 1);
      vm.node.orderNavigationByPriorityInMap(index, index + 1);
      vm.changed = true;
      vm.lastModificationIndex = index + 1;
      _goToCleanStyle();
    }

    function cancel(response) {
      $mdDialog.hide(response);
    }

    function confirm(response) {
      navigationContext.setRoutes(routes);
      WorkspaceService.saveWork();
      vm.changed = false;
      $mdDialog.hide(response);
    }

    function modificationClass(index) {
      if (vm.lastModificationIndex == index) {
        return "md-whiteframe-5dp";
      }
    }

    function _goToCleanStyle() {
      $timeout(function () {
        vm.lastModificationIndex = -1;
      }, 1000);
    }

    function _orderNavigationByPriority(oldPosition, newPosition) {
      var aux = routes[newPosition];
      routes[newPosition] = routes[oldPosition];
      routes[oldPosition] = aux;
      return routes;
    }
  }

})();
