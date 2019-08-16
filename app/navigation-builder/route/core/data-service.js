(function () {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.routeBuilder')
    .service('otusjs.studio.navigationBuilder.routeBuilder.DataService', service);

  service.$inject = [
    'otusjs.studio.navigationBuilder.NavigationBuilderScopeService',
    'otusjs.studio.navigationBuilder.routeBuilder.RuleWhenBuilderService',
    'otusjs.studio.navigationBuilder.routeBuilder.RuleOperatorBuilderService',
    'otusjs.studio.navigationBuilder.routeBuilder.RuleAnswerBuilderService'
  ];

  function service(moduleScope, RuleWhenBuilderService, RuleOperatorBuilderService, RuleAnswerBuilderService) {
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
    self.deleteRoute = deleteRoute;
    self.initializeRouteData = initializeRouteData;
    self.isSimpleNavigation = isSimpleNavigation;
    self.routeExists = routeExists;
    self.selectCondition = selectCondition;
    self.selectRoute = selectRoute;
    self.selectedCondition = selectedCondition;
    self.selectedRoute = selectedRoute;
    self.useCurrentRouteData = useCurrentRouteData;
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
      _survey = null;
      _originNode = null;
      _destinationNode = null;
      _routeData = null;
      _selectedNavigation = null;
      _selectedCondition = null;
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
        moduleScope.emit(moduleScope.NBEVENTS.ORIGIN_NODE_UNSELECTED, node);
      } else if (_areSameNode(_destinationNode, node)) {
        _destinationNode = null;
        moduleScope.emit(moduleScope.NBEVENTS.DESTINATION_NODE_UNSELECTED, node);
      } else if (!hasOriginNode()) {
        _originNode = node;
        moduleScope.emit(moduleScope.NBEVENTS.ORIGIN_NODE_SELECTED, node);
      } else {
        _destinationNode = node;
        moduleScope.emit(moduleScope.NBEVENTS.DESTINATION_NODE_SELECTED, selectedNode());
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
      newConditionData.name = 'ROUTE_CONDITION' + '_' + _routeData.conditions.length;
      newConditionData.rules = [];
      _routeData.conditions.push(newConditionData);
    }

    function deleteCondition(index) {
      _routeData.conditions.splice(index, 1);
      selectCondition(0);
    }

    function deleteRoute() {
      _survey.NavigationManager.selectNavigationByOrigin(_originNode.id);
      _survey.NavigationManager.deleteRoute(_routeData);
    }

    function initializeRouteData() {
      selectNavigation(_originNode.id);
      _routeData = {};
      _routeData.origin = _originNode.id;
      _routeData.destination = _destinationNode.id;
      _routeData.conditions = [];
    }

    function selectCondition(index) {
      if (_routeData.conditions.length) {
        _selectedCondition = _routeData.conditions[index];
      } else {
        return false;
      }
    }

    function selectRoute() {
      return _routeData;
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
      selectNavigation(origin.id);
      var routeData = {};
      routeData.origin = origin.id;
      routeData.destination = destination.id;
      return _selectedNavigation.hasRoute(routeData);
    }

    function useCurrentRouteData() {
      selectNavigation(_originNode.id);
      var routeQuery = {
        name: _originNode.id + '_' + _destinationNode.id
      };
      _routeData = _selectedNavigation.getRouteByName(routeQuery.name).toJSON();
    }

    //-----------------------------------------------------
    // Rule editor
    //-----------------------------------------------------

    function createRule(when, operator, answer, isCustom) {
      var ruleData = {};
      ruleData.when = when;
      ruleData.isMetadata = answer.isMetadata || false;
      ruleData.operator = operator;
      ruleData.isCustom = isCustom;
      if (isCustom) {
        ruleData.answer = answer;
      } else {
        ruleData.answer = answer.option.value;
      }
      _selectedCondition.rules.push(ruleData);
    }

    function deleteRule(ruleIndex) {
      _selectedCondition.rules.splice(ruleIndex, 1);
    }

    function listAvailableAnswer(item) {
      return RuleAnswerBuilderService.build(item);
    }

    function listAvailableOperator(itemType) {
      return RuleOperatorBuilderService.build(itemType);
    }

    function listAvailableWhen() {
      var itemList = _survey.NavigationManager.getAvaiableRuleCriterionTargets(_originNode.id);
      return itemList.map(RuleWhenBuilderService.build);
    }

    function updateRule(ruleIndex, when, operator, answer, isCustom) {
      var ruleData = _selectedCondition.rules[ruleIndex];
      ruleData.when = when;
      ruleData.operator = operator;
      if (isCustom || typeof answer === 'string') {
        ruleData.answer = answer;
        ruleData.isMetadata = false;
        ruleData.isCustom = true;
      } else {
        ruleData.answer = answer.option.value;
        ruleData.isMetadata = answer.isMetadata;
        ruleData.isCustom = false;
      }
    }
  }
})();
