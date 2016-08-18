(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .component('otusNavigationMap', {
      templateUrl: 'app/navigation-builder/navigation-map/navigation-map-template.html',
      controller: component
    });

  component.$inject = [
    '$scope',
    'NBEVENTS',
    'otusjs.studio.navigationBuilder.NavigationBuilderService',
    'otusjs.studio.navigationBuilder.MessageService'
  ];

  function component($scope, NBEVENTS, NavigationBuilderService, MessageService) {
    var self = this;

    /* Component cicle methods */
    self.$onInit = onInit;

    /* Public properties */
    self.mapView = null;

    function onInit() {
      $scope.$parent.$parent.$on(NBEVENTS.MAP_CONTAINER_READY, function(event, data) {
        _setupMapView();
        _renderMap();
        _attachEvents();
      });
      _initializeComponents();
      _initializeEventListeners();
    }

    function _setupMapView() {
      _clearMapView();
      self.mapView = new sigma('map-view');
    }

    function _renderMap() {
      self.mapView.graph.read({
        nodes: NavigationBuilderService.nodes(),
        edges: NavigationBuilderService.edges()
      });
      self.mapView.refresh();
    }

    function _clearMapView() {
      if (self.mapView) {
        self.mapView.graph.clear();
        $('#map-view').empty();
      }
    }

    function _attachEvents() {
      self.mapView.bind('clickNode', function(event) {
        NavigationBuilderService.selectNode(event.data.node);
      });
    }

    function _initializeComponents() {
      self.routeMenuCtrl = new routeMenuController($scope, NavigationBuilderService);
    }

    function _initializeEventListeners() {
      $scope.events = NBEVENTS;
      $scope.$on(NBEVENTS.ROUTE_SERVICE_MODE_ACTIVE, function(event, data) {
        MessageService.log(event);
      });

      $scope.$on(NBEVENTS.ORIGIN_NODE_SELECTED, function(event, data) {
        MessageService.log(event);
      });

      $scope.$on(NBEVENTS.DESTINATION_NODE_SELECTED, function(event, data) {
        MessageService.log(event);
      });
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
