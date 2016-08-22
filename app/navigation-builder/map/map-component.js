(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .component('otusNavigationMap', {
      templateUrl: 'app/navigation-builder/map/map-template.html',
      controller: component
    });

  component.$inject = [
    '$scope',
    'NBEVENTS',
    'NBMESSAGES',
    'otusjs.studio.navigationBuilder.MapVisualHandlerService',
    'otusjs.studio.navigationBuilder.NavigationBuilderService',
    'otusjs.studio.navigationBuilder.NavigationMessengerService'
  ];

  function component($scope, NBEVENTS, NBMESSAGES, MapVisualHandlerService, NavigationBuilderService, NavigationMessengerService) {
    var self = this;

    self.showMessenger = true;

    /* Component cicle methods */
    self.$onInit = onInit;

    function onInit() {
      $scope.events = NBEVENTS;
      $scope.messages = NBMESSAGES;

      _initializeComponents();
      _initializeModuleEvents();
    }

    function _initializeComponents() {
      self.routeMenuCtrl = new routeMenuController($scope, NavigationBuilderService);
    }

    function _initializeModuleEvents() {
      $scope.$parent.$parent.$on(NBEVENTS.MAP_CONTAINER_READY, function(event, data) {
        MapVisualHandlerService.loadMapView(new sigma('map-view'));
        _renderMap();
        NavigationMessengerService.setScope($scope);
      });
    }

    function _renderMap() {
      var nodes = NavigationBuilderService.nodes();
      var edges = NavigationBuilderService.edges();
      MapVisualHandlerService.loadMapData(nodes, edges);
      MapVisualHandlerService.drawMap();
    }
  }

  function routeMenuController($scope, NavigationBuilderService) {
    var self = this;

    _init();

    /* Public methods */
    self.click = click;
    self.addRoute = addRoute;

    function click() {
      self.isOpen = !self.isOpen;
    }

    function addRoute() {
      NavigationBuilderService.activateRouteCreatorMode($scope);
    }

    function _init() {
      self.isOpen = false;
    }
  }
})();
