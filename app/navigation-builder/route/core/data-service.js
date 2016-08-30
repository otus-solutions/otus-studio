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
    var _selectedNavigation = null;
    var _selectedCondition = null;

    /* Public methods */
    // Service management
    self.activate = activate;
    self.deactivate = deactivate;
    // Map interactions
    self.hasDestinationNode = hasDestinationNode;
    self.hasOriginNode = hasOriginNode;
    self.selectNode = selectNode;
    self.selectedEdges = selectedEdges;
    self.selectedNode = selectedNode;
    // Route editor
    self.apply = apply;
    self.createCondition = createCondition;
    self.deleteCondition = deleteCondition;
    self.initializeRouteData = initializeRouteData;
    self.isSimpleNavigation = isSimpleNavigation;
    self.routeExists = routeExists;
    self.selectCondition = selectCondition;
    self.selectedCondition = selectedCondition;
    self.selectedRoute = selectedRoute;
    // Rule editor
    self.createRule = createRule;
    self.deleteRule = deleteRule;
    self.listAvailableAnswer = listAvailableAnswer;
    self.listAvailableOperator = listAvailableOperator;
    self.listAvailableWhen = listAvailableWhen;
    self.updateRule = updateRule;

    //-----------------------------------------------------
    // Service management
    //-----------------------------------------------------

    function activate(survey) {
      _survey = survey;
      window.survey = _survey;
    }

    function deactivate() {
      _originNode = null;
      _destinationNode = null;
      _routeData = null;
    }

    //-----------------------------------------------------
    // Map interactions
    //-----------------------------------------------------

    function hasDestinationNode() {
      return _nodeExists(_destinationNode);
    }

    function hasOriginNode() {
      return _nodeExists(_originNode);
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

    // TODO: implementar
    function selectedEdges() {
      return null;
    }

    function selectedNode() {
      return [_originNode, _destinationNode];
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

    function deleteCondition(index) {
      _routeData.conditionSet.splice(index, 1);
      selectCondition(0);
    }

    function initializeRouteData() {
      selectNavigation(_originNode.id);
      _routeData = {};
      _routeData.origin = _originNode.id;
      _routeData.destination = _destinationNode.id;
      _routeData.conditionSet = [];
    }

    function selectCondition(index) {
      if (_routeData.conditionSet.length) {
        _selectedCondition = _routeData.conditionSet[index];
      } else {
        return false;
      }
    }

    function selectedCondition() {
      return _selectedCondition;
    }

    function selectedRoute() {
      return _routeData;
    }

    function isSimpleNavigation(origin) {
      if (selectNavigation(origin).listRoutes().length === 1) {
        return true;
      } else {
        return false;
      }
    }

    function selectNavigation(origin) {
      _selectedNavigation = _survey.NavigationManager.selectNavigationByOrigin(origin);
      return _selectedNavigation;
    }

    function routeExists(origin, destination) {
      var routeData = {};
      routeData.origin = origin;
      routeData.destination = destination;
      return _selectedNavigation.hasRoute(routeData);
    }

    //-----------------------------------------------------
    // Rule editor
    //-----------------------------------------------------

    function createRule(when, operator, answer) {
      var ruleData = {};
      ruleData.when = when;
      ruleData.operator = operator;
      ruleData.answer = answer;
      _selectedCondition.rules.push(ruleData);
    }

    function deleteRule(ruleIndex) {
      _selectedCondition.rules.splice[ruleIndex, 1];
    }

    function listAvailableAnswer(item) {
      return AnswerSelectorService.listAnswers(item);
    }

    function listAvailableOperator(itemType) {
      return OperatorSelectorService.listOperators(itemType);
    }

    function listAvailableWhen() {
      return _survey.NavigationManager.getAvaiableRuleCriterionTargets(_originNode.id);
    }

    function updateRule(ruleIndex, when, operator, answer) {
      var ruleData = _selectedCondition.rules[ruleIndex];
      ruleData.when = when;
      ruleData.operator = operator;
      ruleData.answer = answer;
    }

  }
})();
