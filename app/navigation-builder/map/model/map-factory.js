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

    /* Public methods */
    self.addNode = addNode;
    self.addEdge = addEdge;
    self.nodes = nodes;
    self.edges = edges;
    self.createNode = createNode;
    self.createNodeForDefaultPath = createNodeForDefaultPath;
    self.createNodeForAlterantivePath = createNodeForAlterantivePath;
    self.createEdge = createEdge;
    self.createEdgeForDefaultPath = createEdgeForDefaultPath;
    self.createEdgeForAlterantivePath = createEdgeForAlterantivePath;
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
        _nodes.push(node);
      }
    }

    function addEdge(edge) {
      if (_nodeExists(edge.source) && _nodeExists(edge.target)) {
        _edges.push(edge);
      }
    }

    function createNode(options) {
      var node = Inject.NodeFactory.create(options);
      addNode(node);
      return node;
    }

    function createNodeForDefaultPath(options) {
      var node = Inject.NodeFactory.createForDefaultPath(options);
      addNode(node);
      return node;
    }

    function createNodeForAlterantivePath(options) {
      var node = Inject.NodeFactory.createForAlterantivePath(options);
      addNode(node);
      return node;
    }

    function createEdge(options, isDefault) {
      return Inject.EdgeFactory.create(options, isDefault);
    }

    function createEdgeForDefaultPath(options) {
      var edge = Inject.EdgeFactory.createForDefaultPath(options);
      addEdge(edge);
      return edge;
    }

    function createEdgeForAlterantivePath(options) {
      var edge = Inject.EdgeFactory.createForAlterantivePath(options);
      addEdge(edge);
      return edge;
    }

    function getNavigation(node) {
      var result = _nodes.filter(function(nodeToCompare) {
        return nodeToCompare.id === node.id;
      });

      return result.length ? result[0].navigation : undefined;
    }

    function _nodeExists(nodeID) {
      var result = _nodes.filter(function(node) {
        return node.id === nodeID;
      });

      return result.length ? true : false;
    }
  }
}());
