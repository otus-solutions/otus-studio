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

    /* Public methods */
    self.activate = activate;
    self.deactivate = deactivate;
    self.selectNode = selectNode;
    self.selectedNode = selectedNode;
    self.selectedEdges = selectedEdges;
    self.selectedRoute = selectedRoute;
    self.selectedCondition = selectedCondition;
    self.startRouteBuilding = startRouteBuilding;
    self.addRule = addRule;
    self.updateRule = updateRule;
    self.deleteRule = deleteRule;
    self.saveRouteBuilding = saveRouteBuilding;
    self.getWhenListForRule = getWhenListForRule;
    self.getOperatorListForRule = getOperatorListForRule;
    self.getAnswerListForRule = getAnswerListForRule;

    //-----------------------------------------------------
    // Service management
    //-----------------------------------------------------

    function activate(survey) {
      DataService.activate(survey);
      EventsService.activate();
      UiEventsService.activate();
    }

    function deactivate() {
      DataService.deactivate();
    }

    //-----------------------------------------------------
    // Map interactions
    //-----------------------------------------------------

    function selectNode(node) {
      DataService.selectNode(node);
    }

    function selectedNode() {
      return DataService.selectedNode();
    }

    function selectedEdges() {
      return DataService.selectedEdges();
    }

    function selectedRoute() {
      return DataService.selectedRoute();
    }

    function selectedCondition() {
      return DataService.selectedCondition();
    }

    //-----------------------------------------------------
    // Route editor
    //-----------------------------------------------------

    function startRouteBuilding(origin, destination) {
      if (DataService.isSimpleNavigation(origin)) {
        DataService.initializeRouteData();
        DataService.createCondition();
      } else {
        
      }
    }

    function saveRouteBuilding() {
      DataService.apply();
    }

    //-----------------------------------------------------
    // Rule editor
    //-----------------------------------------------------

    function getWhenListForRule() {
      return DataService.listAvailableWhen();
    }

    function getOperatorListForRule(itemType) {
      return DataService.listAvailableOperator(itemType);
    }

    function getAnswerListForRule(question) {
      return DataService.listAvailableAnswer(question);
    }

    function addRule(when, operator, answer) {
      DataService.createRule(when, operator, answer);
    }

    function updateRule(ruleIndex, when, operator, answer) {
      DataService.updateRule(ruleIndex, when, operator, answer);
    }

    function deleteRule(ruleIndex) {
      DataService.deleteRule(ruleIndex);
    }
  }
})();
