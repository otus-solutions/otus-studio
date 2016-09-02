(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .factory('otusjs.studio.navigationBuilder.GraphLayerFactory', factory);

  function factory() {
    var self = this;

    self.create = create;

    function create(mapViewContainer) {
      return new GraphLayer(mapViewContainer);
    }

    return self;
  }

  function GraphLayer(mapViewContainer) {
    var self = this;
    var _mapView = {};

    _loadInternalBehaviour();

    /* Public methods */
    self.mapView = mapView;
    self.loadData = loadData;
    self.render = render;
    self.updateNodeStyleBefore = updateNodeStyleBefore;
    self.updateNodeStyle = updateNodeStyle;
    self.updateAllNodesStyle = updateAllNodesStyle;

    function mapView() {
      return _mapView;
    }

    function loadData(nodes, edges) {
      _mapView.graph.clear();
      _mapView.graph.read({
        nodes: nodes,
        edges: edges
      });
    }

    function render() {
      _mapView.refresh();
    }

    function updateNodeStyleBefore(style, nodeLimiter) {
      _mapView.graph.updateNodeStyleBefore(style, nodeLimiter);
    }

    function updateNodeStyle(style, node) {
      _mapView.graph.updateNodeStyle(style, node);
    }

    function updateAllNodesStyle(style) {
      _mapView.graph.updateAllNodesStyle(style);
    }

    function _loadInternalBehaviour() {
      if (!sigma.classes.graph.hasMethod('updateNodeStyleBefore')) {
        // New methods
        sigma.classes.graph.addMethod('updateNodeStyleBefore', _updateNodeStyleBefore);
        sigma.classes.graph.addMethod('updateNodeStyle', _updateNodeStyle);
        sigma.classes.graph.addMethod('updateAllNodesStyle', _updateAllNodesStyle);
        // Listeners methods
        sigma.classes.graph.attach('addNode', 'onAddNode', _onAddNode);
        sigma.classes.graph.attach('addEdge', 'onAddEdge', _onAddEdge);
      }
      $('#map-view').empty();
      _mapView = new sigma(mapViewContainer);
    }

    function _updateNodeStyleBefore(style, nodeLimiter) {
      this.nodesArray.every(function(node) {
        if (node.id !== nodeLimiter.id) {
          node.color = style.color;
          node.isDisabled = style.isDisabled;
          return true;
        }
      });
    }

    function _updateNodeStyle(style, nodeToUpdate) {
      this.nodesArray.some(function(node) {
        if (node.id === nodeToUpdate.id) {
          node.color = style.color;
          node.isDisabled = style.isDisabled;
          return true;
        }
      });
    }

    function _updateAllNodesStyle(style) {
      this.nodesArray.forEach(function(node) {
        node.color = style.color;
        node.isDisabled = style.isDisabled;
      });
    }

    function _onAddNode(addedNode) {
    }

    function _onAddEdge(edge) {
      var source = null;
      var target = null;

      this.nodesArray.some(function(node) {
        if (node.id === edge.source) {
          source = node;
        } else if (node.id === edge.target) {
          target = node;
        }

        return source !== null && target !== null;
      });

      source.connect(target);
    }
  }
}());
