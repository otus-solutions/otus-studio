(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .service('otusjs.studio.navigationBuilder.NavigationBuilderService', service);

  service.$inject = [
    'otusjs.studio.navigationBuilder.model.MapFactory',
    'otusjs.studio.navigationBuilder.RouteBuilderService',
    'otusjs.studio.navigationBuilder.NavigationInspectorService'
  ];

  function service(MapFactory, RouteBuilderService, NavigationInspectorService) {
    var self = this;
    var _rawData = {};
    var _navigationMap = {};
    var _activeServiceMode = null;

    self.mapData = null;

    /* Public methods */
    self.navigationMap = navigationMap;
    self.nodes = nodes;
    self.edges = edges;
    self.loadTemplateNavigations = loadTemplateNavigations;
    self.selectNode = selectNode;
    self.selectedNode = selectedNode;
    self.selectedNavigation = selectedNavigation;
    self.selectedNodeFamily = selectedNodeFamily;
    self.selectedEdges = selectedEdges;
    self.activateRouteCreatorMode = activateRouteCreatorMode;
    self.activateNavigationInspectorMode = activateNavigationInspectorMode;

    function navigationMap() {
      return _navigationMap;
    }

    function nodes() {
      return _navigationMap.nodes();
    }

    function edges() {
      return _navigationMap.edges();
    }

    function loadTemplateNavigations(templateNavigations) {
      _rawData = templateNavigations;
      _navigationMap = MapFactory.create();
      _addNodes(templateNavigations);
      _addEdges(templateNavigations);
    }

    function selectNode(node) {
      _activeServiceMode.selectNode(node);
    }

    function selectedNode() {
      return _activeServiceMode.selectedNode();
    }

    function selectedNavigation() {
      return _activeServiceMode.selectedNavigation();
    }

    function selectedNodeFamily() {
      return _activeServiceMode.selectedNodeFamily();
    }

    function selectedEdges() {
      return _activeServiceMode.selectedEdges();
    }

    function activateRouteCreatorMode($scope) {
      _activeServiceMode = RouteBuilderService;
      _activeServiceMode.setScope($scope);
      $scope.$emit($scope.events.ROUTE_SERVICE_MODE_ACTIVE);
    }

    function activateNavigationInspectorMode($scope) {
      _activeServiceMode = NavigationInspectorService;
    }

    function _addNodes(templateNavigations) {
      templateNavigations.forEach(function(navigation) {
        var nodeOptions = { id: navigation.origin, label: navigation.origin };
        var node = _navigationMap.createNode(nodeOptions);
        node.navigation = navigation;
        _navigationMap.addNode(node);
      });
    }

    function _addEdges(templateNavigations) {
      templateNavigations.forEach(function(navigation) {

        navigation.routes.forEach(function(route) {
          var edgeOptions = {};
          edgeOptions.id = navigation.origin;
          edgeOptions.source = route.origin;
          edgeOptions.target = route.destination;
          var edge = _navigationMap.createEdge(edgeOptions);
          edge.route = route;
          _navigationMap.addEdge(edge);
        });

      });
    }
  }
})();
