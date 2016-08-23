(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.routeBuilder')
    .service('otusjs.studio.navigationBuilder.routeBuilder.DataService', service);

  service.$inject = [
    'otusjs.studio.navigationBuilder.NavigationBuilderScopeService',
    'otusjs.studio.navigationBuilder.routeBuilder.OperatorSelectorService',
    'otusjs.studio.navigationBuilder.routeBuilder.AnswerSelectorService'
  ];

  function service(scopeService, OperatorSelectorService, AnswerSelectorService) {
    var self = this;
    var _survey = null;
    var _originNode = null;
    var _destinationNode = null;

    /* Public methods */
    self.activate = activate;
    self.deactivate = deactivate;
    self.selectNode = selectNode;
    self.selectedNode = selectedNode;
    self.selectedEdges = selectedEdges;
    self.hasOriginNode = hasOriginNode;
    self.hasDestinationNode = hasDestinationNode;
    self.listAvailableWhen = listAvailableWhen;
    self.listAvailableOperator = listAvailableOperator;
    self.listAvailableAnswer = listAvailableAnswer;

    function activate(survey) {
      _survey = survey;
    }

    function deactivate() {
      _originNode = null;
      _destinationNode = null;
    }

    function selectNode(node) {
      if (_areSameNode(_originNode, node)) {
        _originNode = null;
        scopeService.emit(scopeService.NBEVENTS.ORIGIN_NODE_UNSELECTED, node);
      } else if (_areSameNode(_destinationNode, node)) {
        _destinationNode = null;
        scopeService.emit(scopeService.NBEVENTS.DESTINATION_NODE_UNSELECTED, node);
      } else if (!hasOriginNode()) {
        _originNode = node;
        scopeService.emit(scopeService.NBEVENTS.ORIGIN_NODE_SELECTED, node);
      } else {
        _destinationNode = node;
        scopeService.emit(scopeService.NBEVENTS.DESTINATION_NODE_SELECTED, selectedNode());
      }
    }

    function selectedNode() {
      return [_originNode, _destinationNode];
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

    function listAvailableWhen() {
      return _survey.NavigationManager.getAvaiableRuleCriterionTargets(_originNode.id);
    }

    function listAvailableOperator(itemType) {
      return OperatorSelectorService.listOperators(itemType);
    }

    function listAvailableAnswer(item) {
      return AnswerSelectorService.listAnswers(item);
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
