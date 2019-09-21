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
    var _touched = 0;
    self.cam = null;

    _loadInternalBehaviour();

    /* Public methods */
    self.mapView = mapView;
    self.loadData = loadData;
    self.render = render;
    self.updateNodeStyleBefore = updateNodeStyleBefore;
    self.updateNodeStyle = updateNodeStyle;
    self.updateNodesStyle = updateNodesStyle;
    self.updateAllNodesStyle = updateAllNodesStyle;
    self.updateAllEdgesStyle = updateAllEdgesStyle;
    self.updateOutputs = updateOutputs;
    self.updateInputs = updateInputs;

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

    function updateNodesStyle(style, node) {
      _mapView.graph.updateNodesStyle(style, node);
    }

    function updateAllNodesStyle(style) {
      _mapView.graph.updateAllNodesStyle(style);
    }

    function updateAllEdgesStyle(style) {
      _mapView.graph.updateAllEdgesStyle(style);
    }

    function updateOutputs(style, referenceNode) {
      _mapView.graph.updateOutputs(style, referenceNode);
    }

    function updateInputs(style, referenceNode) {
      _mapView.graph.updateInputs(style, referenceNode);
    }

    function _loadInternalBehaviour() {
      if (!sigma.classes.graph.hasMethod('updateNodeStyleBefore')) {
        sigma.classes.graph.addMethod('updateNodeStyleBefore', _updateNodeStyleBefore);
        sigma.classes.graph.addMethod('updateNodeStyle', _updateNodeStyle);
        sigma.classes.graph.addMethod('updateNodesStyle', _updateNodesStyle);
        sigma.classes.graph.addMethod('updateAllNodesStyle', _updateAllNodesStyle);
        sigma.classes.graph.addMethod('updateAllEdgesStyle', _updateAllEdgesStyle);
        sigma.classes.graph.addMethod('updateOutputs', _updateOutputs);
        sigma.classes.graph.addMethod('updateInputs', _updateInputs);
        sigma.classes.graph.attach('addNode', 'onAddNode', _onAddNode);
        sigma.classes.graph.attach('addEdge', 'onAddEdge', _onAddEdge);
      }
      $('#map-view').empty();
      _mapView = new sigma();
      var cam = _mapView.addCamera('#map-view');
      _mapView.addRenderer({
          container: mapViewContainer,
          type: 'canvas',
          camera: cam
      });
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

    function _updateNodesStyle(style, nodes) {
      this.nodesArray.some(function(node) {

        nodes.some(function(nodeOrigin, index, nodes) {
          if (node.id === nodeOrigin) {
            node.color = style.color;
            node.isDisabled = style.isDisabled;
            nodes.splice(index, 1);
            return true;
          }
        });

        if (!nodes.length) {
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

    function _updateAllEdgesStyle(style) {
      this.edgesArray.forEach(function(edge) {
        edge.color = style.color;
      });
    }

    function _updateInputs(style, referenceNode) {
      var neighbors = this.inNeighborsIndex[referenceNode.id];
      var neighbor = null;

      for (neighbor in neighbors) {
        this.nodesArray.some(function(node) {
          if (node.id === neighbor) {
            node.color = style.color;
            return true;
          }
        });

        this.edgesArray.some(function(edge) {
          if (edge.source === neighbor && edge.target === referenceNode.id) {
            edge.color = style.color;
            return false;
          }
        });
      }
    }

    function _updateOutputs(style, referenceNode) {
      var neighbors = this.outNeighborsIndex[referenceNode.id];
      var neighbor = null;

      for (neighbor in neighbors) {
        this.nodesArray.some(function(node) {
          if (node.id === neighbor) {
            node.color = style.color;
            return true;
          }
        });
      }

      this.edgesArray.forEach(function(edge) {
        if (edge.source === referenceNode.id) {
          edge.color = style.color;
        }
      });
    }

    function _onAddNode(node) {
      if (node.isOrphan) {
        updateNodeStyle({ color: '#571616' }, node);
      }
    }

    function _onAddEdge(edge) {
      var source = this.nodesArray.filter(function(node) {
        return node.id === edge.source;
      })[0];

      var target = this.nodesArray.filter(function(node) {
        return node.id === edge.target;
      })[0];

      source.connectOut(target, edge.isDefault);
    }
  }
}());
