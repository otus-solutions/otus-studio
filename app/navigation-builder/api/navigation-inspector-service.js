(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .service('otusjs.studio.navigationBuilder.NavigationInspectorService', service);

  function service() {
    var self = this;
    var _selectedNode = null;

    /* Public methods */
    self.selectNode = selectNode;

    function selectNode(node) {
      _selectedNode = node;
      _selectedNodeFamily = [_selectedNode];
      _selectedEdges = [];

      _selectedNode.navigation.routes.forEach(function(route) {
        _calculateSelectedNodeFamily(route);
        _calculateSelectedEdges(route);
      });
    }

    function selectedNode() {
      return _selectedNode;
    }

    function selectedNavigation() {
      return _selectedNode.navigation;
    }

    function selectedNodeFamily() {
      return _selectedNodeFamily;
    }

    function selectedEdges() {
      return _selectedEdges;
    }

    function _calculateSelectedNodeFamily(route) {
      var result = _navigationMap.nodes().filter(function(node) {
        return node.id === route.destination;
      });
      _selectedNodeFamily.push(result[0]);
    }

    function _calculateSelectedEdges(route) {
      var result = _navigationMap.edges().filter(function(edge) {
        return edge.target === route.destination;
      });
      _selectedEdges.push(result[0]);
    }
  }
})();
