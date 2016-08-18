(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .service('otusjs.studio.navigationBuilder.RouteBuilderService', service);

  service.$inject = [
    'otusjs.studio.navigationBuilder.NavigationDataDialogService'
  ];

  function service(NavigationDataDialogService) {
    var self = this;
    var _originNode = null;
    var _destinationNode = null;
    var _scope = null;

    /* Public methods */
    self.setScope = setScope;
    self.selectNode = selectNode;

    function setScope(scope) {
      _scope = scope;
    }

    function selectNode(node) {
      if (!_originNode) {
        _originNode = node;
        _scope.$emit(_scope.events.ORIGIN_NODE_SELECTED);
      } else {
        _destinationNode = node;
        _scope.$emit(_scope.events.DESTINATION_NODE_SELECTED);
        NavigationDataDialogService.showDialog(_originNode, _destinationNode);
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
  }
})();
