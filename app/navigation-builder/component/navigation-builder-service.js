(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .service('otusjs.studio.navigationBuilder.NavigationBuilderService', service);

  service.$inject = [
    'otusjs.studio.navigationBuilder.model.MapFactory'
  ];

  function service(MapFactory) {
    var self = this;
    var _rawData = {};
    var _navigationMap = {};
    var _selectedNode = null;

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
      _selectedNode = node;
    }

    function selectedNode() {
      return _selectedNode;
    }

    function selectedNavigation() {
      return _selectedNode.navigation;
    }

    function selectedNodeFamily() {
      var nodes = [selectedNode()];
      _selectedNode.navigation.routes.forEach(function(route) {
        var result = _navigationMap.nodes().filter(function(node) {
          return node.id === route.destination;
        });
        nodes.push(result[0]);
      });

      return nodes;
    }

    function selectedEdges() {
      var edges = [];
      _selectedNode.navigation.routes.forEach(function(route) {
        var result = _navigationMap.edges().filter(function(edge) {
          return edge.target === route.destination;
        });
        edges.push(result[0]);
      });

      return edges;
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
