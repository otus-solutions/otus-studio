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
    // Service management
    self.activate = activate;
    self.deactivate = deactivate;
    // Map interactions
    self.selectNode = selectNode;
    self.selectedCondition = selectedCondition;
    self.selectedEdges = selectedEdges;
    self.selectedNode = selectedNode;
    self.selectedRoute = selectedRoute;
    // Route editor
    self.createCondition = createCondition;
    self.deleteCondition = deleteCondition;
    self.saveRouteBuilding = saveRouteBuilding;
    self.selectCondition = selectCondition;
    self.startRouteBuilding = startRouteBuilding;
    // Rule editor
    self.createRule = createRule;
    self.deleteRule = deleteRule;
    self.getAnswerListForRule = getAnswerListForRule;
    self.getOperatorListForRule = getOperatorListForRule;
    self.getWhenListForRule = getWhenListForRule;
    self.updateRule = updateRule;

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

    function selectedCondition() {
      return DataService.selectedCondition();
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

    //-----------------------------------------------------
    // Route editor
    //-----------------------------------------------------

    function createCondition() {
      DataService.createCondition();
    }

    function deleteCondition(index) {
      DataService.deleteCondition(index);
    }

    function saveRouteBuilding() {
      DataService.apply();
    }

    function selectCondition(index) {
      DataService.selectCondition(index);
    }

    function startRouteBuilding(origin, destination) {
      if (DataService.isSimpleNavigation(origin.id)) {
        DataService.initializeRouteData();
        DataService.createCondition();
      } else {
        if (DataService.routeExists(origin, destination)) {
          // TODO: implementar recuperação dos dados da rota
        } else {
          DataService.initializeRouteData();
          DataService.createCondition();
        }
      }
      DataService.selectCondition(0);
    }

    //-----------------------------------------------------
    // Rule editor
    //-----------------------------------------------------

    function createRule(when, operator, answer) {
      DataService.createRule(when, operator, answer);
    }

    function deleteRule(ruleIndex) {
      DataService.deleteRule(ruleIndex);
    }

    function getAnswerListForRule(question) {
      return DataService.listAvailableAnswer(question);
    }

    function getOperatorListForRule(itemType) {
      return DataService.listAvailableOperator(itemType);
    }

    function getWhenListForRule() {
      return DataService.listAvailableWhen();
    }

    function updateRule(ruleIndex, when, operator, answer) {
      DataService.updateRule(ruleIndex, when, operator, answer);
    }

  }
})();
