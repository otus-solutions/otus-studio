(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .factory('otusjs.studio.navigationBuilder.MapFactory', factory);

  factory.$inject = [
    'otusjs.studio.navigationBuilder.NodeFactory',
    'otusjs.studio.navigationBuilder.EdgeFactory'
  ];

  var Inject = {
    NodeFactory: {},
    EdgeFactory: {}
  }

  function factory(NodeFactory, EdgeFactory) {
    var self = this;

    Inject.NodeFactory = NodeFactory;
    Inject.EdgeFactory = EdgeFactory;

    self.create = create;

    function create(data) {
      return new Map(data);
    }

    return self;
  }

  function Map(data) {
    var self = this;
    var _nodes = [];
    var _edges = [];
    var _yAxis = 0;

    _init();

    function _init() {
      if (data) {
        _yAxis = parseInt((data.nodes.length / 2));
        data.nodes.forEach(function(item) {
          addNode(_parseToNodeOptions(item));
        });
      }
    }

    /* Public methods */
    self.addNode = addNode;
    self.addEdge = addEdge;
    self.nodes = nodes;
    self.edges = edges;
    self.createNode = createNode;
    self.createEdge = createEdge;
    self.getNavigation = getNavigation;

    function nodes() {
      return _nodes;
    }

    function edges() {
      return _edges;
    }

    function addNode(node) {
      if (!_nodeExists(node.id)) {
        node.x = _nodes.length;
        node.y = 0;
        _nodes.push(node);
      }
    }

    function addEdge(edge) {
      if (_nodeExists(edge.source) && _nodeExists(edge.target)) {
        _edges.push(edge);
      }
    }

    function createNode(options) {
      return Inject.NodeFactory.create(options);
    }

    function createEdge(options) {
      return Inject.EdgeFactory.create(options);
    }

    function getNavigation(node) {
      var result = _nodes.filter(function(nodeToCompare) {
        return nodeToCompare.id === node.id;
      });

      return result.length ? result[0].navigation : undefined;
    }

    function _parseToNodeOptions(data) {
      return {
        id: data.origin,
        label: data.origin,
        x: _nodes.length,
        y: _yAxis
      };
    }

    function _nodeExists(nodeID) {
      var result = _nodes.filter(function(node) {
        return node.id === nodeID;
      });

      return result.length ? true : false;
    }
  }
}());
