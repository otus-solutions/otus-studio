(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .service('otusjs.studio.navigationBuilder.MapVisualHandlerService', service);

  function service() {
    var self = this;
    var _mapView = null;
    var _selectedNodes = [];

    /* Public methods */
    self.mapView = mapView;
    self.loadMapView = loadMapView;
    self.loadMapData = loadMapData;
    self.drawMap = drawMap;
    self.clearMap = clearMap;
    self.markOriginRouteNode = markOriginRouteNode;
    self.markDestinationRouteNode = markDestinationRouteNode;
    self.unmarkNode = unmarkNode;
    self.lockPreviousNodesOf = lockPreviousNodesOf;
    self.releasePreviousNodesOf = releasePreviousNodesOf;
    self.clearSelections = clearSelections;

    function mapView() {
      return _mapView;
    }

    function loadMapView(mapView) {
      clearMap();
      _mapView = mapView;
    }

    function loadMapData(nodes, edges) {
      _mapView.graph.read({
        nodes: nodes,
        edges: edges
      });
    }

    function drawMap() {
      _mapView.refresh();
    }

    function clearMap() {
      if (_mapView) {
        _mapView.graph.clear();
        $('#map-view').empty();
      }
    }

    function markOriginRouteNode(nodeToMark) {
      nodeToMark.color = '#00F';
      _selectedNodes.push(nodeToMark);
    }

    function markDestinationRouteNode(nodeToMark) {
      nodeToMark.color = '#F00';
      _selectedNodes.push(nodeToMark);
    }

    function unmarkNode(nodeToMark) {
      nodeToMark.color = '#000';
    }

    function lockPreviousNodesOf(nodeLimiter) {
      _mapView.graph.nodes().every(function(node) {
        if (node.id !== nodeLimiter.id) {
          node.color = '#CCC';
          node.isDisabled = true;
          _selectedNodes.push(node);
          return true;
        }
      });
    }

    function releasePreviousNodesOf(nodeLimiter) {
      _mapView.graph.nodes().every(function(node) {
        if (node.id !== nodeLimiter.id) {
          node.color = '#000';
          node.isEnabled = false;
          return true;
        }
      });
    }

    function clearSelections() {
      _selectedNodes.forEach(function(node) {
        node.color = '#000';
      });
      // clearMap();
      drawMap();
    }
  }
})();
