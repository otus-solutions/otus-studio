(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.routeBuilder')
    .service('otusjs.studio.navigationBuilder.routeBuilder.DataService', service);

  function service() {
    var self = this;
    var _originNode = null;
    var _destinationNode = null;
    var _scope = null;

    /* Public methods */
    self.activate = activate;
    self.deactivate = deactivate;
    self.selectNode = selectNode;
    self.selectedNode = selectedNode;
    self.selectedNavigation = selectedNavigation;
    self.selectedNodeFamily = selectedNodeFamily;
    self.selectedEdges = selectedEdges;
    self.hasOriginNode = hasOriginNode;
    self.hasDestinationNode = hasDestinationNode;

    function activate(scope) {
      _scope = scope;
    }

    function deactivate() {
      _originNode = null;
      _destinationNode = null;
      _scope = null;
    }

    function selectNode(node) {
      if (_areSameNode(_originNode, node)) {
        _originNode = null;
        _scope.$emit(_scope.events.ORIGIN_NODE_UNSELECTED, node);
      } else if (_areSameNode(_destinationNode, node)) {
        _destinationNode = null;
        _scope.$emit(_scope.events.DESTINATION_NODE_UNSELECTED, node);
      } else if (!hasOriginNode()) {
        _originNode = node;
        _scope.$emit(_scope.events.ORIGIN_NODE_SELECTED, node);
      } else {
        _destinationNode = node;
        _scope.$emit(_scope.events.DESTINATION_NODE_SELECTED, selectedNode());
      }
    }

    function selectedNode() {
      return [_originNode, _destinationNode];
    }

    function selectedNavigation() {
      return [_originNode.navigation, _destinationNode.navigation];
    }

    function selectedNodeFamily() {
      return undefined;
    }

    function selectedEdges() {
      return undefined;
    }

    function hasOriginNode() {
      return _nodeExists(_originNode);
    }

    function hasDestinationNode() {
      if (!_destinationNode) {
        return false;
      } else {
        return true;
      }
    }

    function _areSameNode(originalNode, nodeToCompare) {
      if (_nodeExists(originalNode) && (originalNode.id === nodeToCompare.id)) {
        return true;
      } else {
        return false;
      }
    }

    function _nodeExists(node) {
      if (!node) {
        return false;
      } else {
        return true;
      }
    }
  }
})();
