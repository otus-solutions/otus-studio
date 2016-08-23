(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.routeBuilder')
    .service('otusjs.studio.navigationBuilder.routeBuilder.RouteBuilderService', service);

  service.$inject = [
    'otusjs.studio.navigationBuilder.routeBuilder.DataService',
    'otusjs.studio.navigationBuilder.routeBuilder.EventsService',
    'otusjs.studio.navigationBuilder.routeBuilder.UiEventsService'
  ];

  function service(DataService, EventsService, UiEventsService) {
    var self = this;
    self.routeData = null;

    /* Public methods */
    self.activate = activate;
    self.deactivate = deactivate;
    self.selectNode = selectNode;
    self.selectedNode = selectedNode;
    self.selectedEdges = selectedEdges;
    self.startRouteBuilding = startRouteBuilding;
    self.addRule = addRule;
    self.getWhenListForRule = getWhenListForRule;
    self.getOperatorListForRule = getOperatorListForRule;
    self.getAnswerListForRule = getAnswerListForRule;

    function activate(survey) {
      DataService.activate(survey);
      EventsService.activate();
      UiEventsService.activate();
    }

    function deactivate() {
      DataService.deactivate();
    }

    function selectNode(node) {
      DataService.selectNode(node);
    }

    function selectedNode() {
      return DataService.selectedNode();
    }

    function selectedEdges() {
      return DataService.selectedEdges();
    }

    function startRouteBuilding() {
      var sourceNavigation = selectedNode()[0].navigation;
      var targetNavigation = selectedNode()[1].navigation;

      self.routeData = {};
      self.routeData.origin = sourceNavigation.origin;
      self.routeData.destination = targetNavigation.origin;

      self.routeData.conditionSet = [];
    }

    function addRule(when, operator, answer) {
      var ruleData = {};
      ruleData.when = when;
      ruleData.operator = operator;
      ruleData.answer = answer;
      self.routeData.conditionSet.push(ruleData);
    }

    function getWhenListForRule() {
      return DataService.listAvailableWhen();
    }

    function getOperatorListForRule(itemType) {
      return DataService.listAvailableOperator(itemType);
    }

    function getAnswerListForRule(question) {
      return DataService.listAvailableAnswer(question);
    }
  }
})();
