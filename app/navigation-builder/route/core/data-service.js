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
    var _routeData = null;
    var _selectedCondition = null;
    var _selectedConditionIndex = null;

    /* Public methods */
    // Service management
    self.activate = activate;
    self.deactivate = deactivate;
    // Map interactions
    self.selectNode = selectNode;
    self.selectedNode = selectedNode;
    self.selectedEdges = selectedEdges;
    self.hasOriginNode = hasOriginNode;
    self.hasDestinationNode = hasDestinationNode;
    // Route editor
    self.apply = apply;
    self.createCondition = createCondition;
    self.initializeRouteData = initializeRouteData;
    self.selectCondition = selectCondition;
    self.selectedCondition = selectedCondition;
    self.selectedRoute = selectedRoute;
    self.isSimpleNavigation = isSimpleNavigation;
    // Rule editor
    self.listAvailableWhen = listAvailableWhen;
    self.listAvailableOperator = listAvailableOperator;
    self.listAvailableAnswer = listAvailableAnswer;
    self.createRule = createRule;
    self.updateRule = updateRule;
    self.deleteRule = deleteRule;

    //-----------------------------------------------------
    // Service management
    //-----------------------------------------------------

    function activate(survey) {
      _survey = survey;
    }

    function deactivate() {
      _originNode = null;
      _destinationNode = null;
      _routeData = null;
    }

    //-----------------------------------------------------
    // Map interactions
    //-----------------------------------------------------

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

    // TODO: implementar
    function selectedEdges() {
      return null;
    }

    function hasOriginNode() {
      return _nodeExists(_originNode);
    }

    function hasDestinationNode() {
      return _nodeExists(_destinationNode);
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

    //-----------------------------------------------------
    // Route editor
    //-----------------------------------------------------

    function apply() {
      _survey.NavigationManager.selectNavigationByOrigin(_originNode.id);
      _survey.NavigationManager.applyRoute(_routeData);
    }

    function createCondition() {
      var newConditionData = {};
      newConditionData.name = 'ROUTE_CONDITION';
      newConditionData.rules = [];
      _routeData.conditionSet.push(newConditionData);
    }

    function initializeRouteData() {
      _routeData = {};
      _routeData.origin = _originNode.id;
      _routeData.destination = _destinationNode.id;
      _routeData.conditionSet = [];
    }

    function selectCondition(index) {
      _selectedConditionIndex = index;
      _selectedCondition = _routeData.conditionSet[index];
    }

    function selectedCondition() {
      return _selectedCondition;
    }

    function selectedRoute() {
      return _routeData;
    }

    function isSimpleNavigation(origin) {
      var navigation = _survey.NavigationManager.selectNavigationByOrigin(origin);

      if (navigation.listRoutes().length === 1) {
        return true;
      } else {
        return false;
      }
    }

    function selectNavigation(origin) {

    }

    //-----------------------------------------------------
    // Rule editor
    //-----------------------------------------------------

    function listAvailableWhen() {
      return _survey.NavigationManager.getAvaiableRuleCriterionTargets(_originNode.id);
    }

    function listAvailableOperator(itemType) {
      return OperatorSelectorService.listOperators(itemType);
    }

    function listAvailableAnswer(item) {
      return AnswerSelectorService.listAnswers(item);
    }

    function createRule(when, operator, answer) {
      var ruleData = {};
      ruleData.when = when;
      ruleData.operator = operator;
      ruleData.answer = answer;
      _selectedCondition.rules.push(ruleData);
    }

    function updateRule(ruleIndex, when, operator, answer) {
      var ruleData = _selectedCondition.rules[ruleIndex];
      ruleData.when = when;
      ruleData.operator = operator;
      ruleData.answer = answer;
    }

    function deleteRule(ruleIndex) {
      _selectedCondition.rules.splice[ruleIndex, 1];
    }
  }
})();
